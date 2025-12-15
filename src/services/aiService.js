import { retrieveContext } from './vectorService';

const OLLAMA_API_URL = 'http://localhost:11434/api/chat';
const MODEL_NAME = 'weather-expert'; // Custom model from Modelfile

const callOllama = async (messages, jsonMode = false) => {
    try {
        console.log("🤖 Calling Ollama API...");
        const startTime = performance.now();

        // Add timeout to prevent infinite waiting (120s for first load)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 second timeout

        const response = await fetch(OLLAMA_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: messages,
                stream: false,
                format: jsonMode ? 'json' : undefined,
                keep_alive: -1, // Keep model loaded indefinitely for speed
                options: {
                    num_ctx: 2048, // Limit context window for speed
                    temperature: 0.7
                }
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ollama API error: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const endTime = performance.now();
        console.log(`✅ Ollama responded in ${Math.round(endTime - startTime)}ms`);

        return data.message.content;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error("❌ Ollama request timed out after 120 seconds");
            throw new Error("AI request timed out. Vector store may still be initializing. Please wait and try again.");
        }
        console.error("❌ Ollama Error:", error);
        throw error;
    }
};

export const getWeatherBriefing = async (weatherData) => {
    try {
        console.log("🔍 Starting weather briefing generation...");
        const overallStart = performance.now();

        // 1. RAG: Retrieve relevant safety tips based on weather conditions
        // Pass full weather data for better query expansion
        const safetyTips = await retrieveContext(
            weatherData.description,
            3, // Get top 3 most relevant tips
            weatherData // Pass weather data for query expansion
        );

        const safetyContext = safetyTips.length > 0
            ? `Relevant Safety Tips from Knowledge Base:\n${safetyTips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}`
            : "No specific safety warnings.";

        // Chain of Thought Prompt
        const prompt = `
      Weather Context: 
      - Location: ${weatherData.location}
      - Temperature: ${weatherData.temperature}°C
      - Conditions: ${weatherData.description}
      - Humidity: ${weatherData.humidity}%
      - Wind Speed: ${weatherData.windSpeed} km/h
      
      ${safetyContext}
      
      Think step-by-step:
      1. Analyze the temperature (${weatherData.temperature}°C) and weather conditions (${weatherData.description}).
      2. Review the safety tips provided above from the knowledge base.
      3. In your "reasoning", explicitly reference which specific safety tip(s) you are using and why they are relevant.
      4. Create a witty, practical clothing recommendation based on the conditions.
      5. Suggest an appropriate activity that considers the weather and safety tips.

      Return JSON:
      {
        "reasoning": "Step-by-step analysis citing specific safety tips and why they apply to current conditions.",
        "recommendation": "Concise, witty clothing advice (max 20 words)",
        "activity": "Practical activity suggestion considering weather and safety (max 20 words)"
      }
    `;

        const response = await callOllama([
            { role: "user", content: prompt }
        ], true);

        const result = JSON.parse(response);

        const overallEnd = performance.now();
        console.log(`✅ Total briefing generation time: ${Math.round(overallEnd - overallStart)}ms`);

        // Inject the actual tips used into the result for UI display
        return {
            ...result,
            safetyTips: safetyTips // Pass the retrieved tips back to the UI
        };

    } catch (error) {
        console.error("❌ Error generating briefing:", error);
        return {
            recommendation: "Unable to get AI recommendation. Please try again.",
            activity: "Check your Ollama service.",
            reasoning: `Error: ${error.message}`,
            safetyTips: []
        };
    }
};

/**
 * ReAct Agent Implementation
 */
export const runAgent = async (userQuery, weatherData, performSearch) => {
    // Reduced max steps for faster turnaround
    const MAX_STEPS = 3;
    let history = [];

    const systemPrompt = `
    You are a weather agent. Tools:
    1. SEARCH_CITY(city)
    2. LOOKUP_SAFETY(query)
    3. FINAL_ANSWER(text)
    
    Context: ${JSON.stringify(weatherData)}
    
    Return JSON: {"thought": "...", "action": "...", "actionInput": "..."}
  `;

    history.push({ role: "system", content: systemPrompt });
    history.push({ role: "user", content: userQuery });

    let logs = [];

    for (let i = 0; i < MAX_STEPS; i++) {
        const response = await callOllama(history, true);
        let step;
        try {
            step = JSON.parse(response);
        } catch (e) {
            console.error("JSON Parse Error", response);
            return { response: "I got confused.", logs };
        }

        logs.push(step);
        history.push({ role: "assistant", content: response });

        if (step.action === "FINAL_ANSWER") {
            return { response: step.actionInput, logs };
        }

        // Execute Tools
        let observation = "";
        if (step.action === "SEARCH_CITY") {
            if (performSearch) {
                performSearch(step.actionInput);
                return { response: `Searching for ${step.actionInput}...`, logs, action: 'SEARCH', city: step.actionInput };
            }
        } else if (step.action === "LOOKUP_SAFETY") {
            const context = await retrieveContext(step.actionInput);
            observation = `Safety Tips: ${context.slice(0, 2).join("; ")}`; // Limit context size
        } else {
            observation = "Unknown tool.";
        }

        history.push({ role: "user", content: `Observation: ${observation}` });
    }

    return { response: "I timed out.", logs };
};

