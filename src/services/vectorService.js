import { weatherKnowledgeBase } from '../data/knowledgeData';

const OLLAMA_API_URL = 'http://localhost:11434/api/embeddings';
const MODEL_NAME = 'llama3';

let vectorStore = [];
let useSimpleMatching = true; // Use keyword matching instead of embeddings for speed

// --- STEP 1: CHUNKING ---
const chunkText = (data) => {
    console.log("Step 1: Chunking Data...");
    return data;
};

// --- STEP 2: EMBEDDING (DISABLED FOR SPEED) ---
const generateEmbedding = async (text) => {
    try {
        const response = await fetch(OLLAMA_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt: text
            })
        });
        const data = await response.json();
        return data.embedding;
    } catch (error) {
        console.error("Embedding error:", error);
        return null;
    }
};

// Initialize Store - NOW DISABLED FOR SPEED
export const initializeVectorStore = async () => {
    console.log("⚡ Using fast keyword-based matching (no embeddings needed)");
    console.log("✅ Vector Store Ready instantly!");
    useSimpleMatching = true;
    return Promise.resolve();
};

// --- STEP 3: RETRIEVAL (FAST VERSION) ---
const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
};

// FAST: Keyword-based matching (no embeddings needed)
const keywordMatch = (text, keywords) => {
    const lowerText = text.toLowerCase();
    let score = 0;

    keywords.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
            score += 1;
        }
    });

    return score;
};

const expandQuery = (weatherDescription, temperature, windSpeed) => {
    let queries = [weatherDescription];

    // Add temperature-based queries
    if (temperature > 35) {
        queries.push("extreme heat");
    } else if (temperature > 30) {
        queries.push("hot weather", "heat");
    } else if (temperature < 0) {
        queries.push("freezing", "ice");
    } else if (temperature < 10) {
        queries.push("cold weather");
    }

    // Add wind-based queries
    if (windSpeed > 40) {
        queries.push("strong wind");
    }

    // Add condition-based queries
    if (weatherDescription.includes("rain") || weatherDescription.includes("drizzle")) {
        queries.push("rain", "wet");
    } else if (weatherDescription.includes("snow")) {
        queries.push("snow");
    } else if (weatherDescription.includes("thunder") || weatherDescription.includes("storm")) {
        queries.push("thunderstorm", "lightning");
    } else if (weatherDescription.includes("fog") || weatherDescription.includes("mist")) {
        queries.push("fog");
    } else if (weatherDescription.includes("clear") || weatherDescription.includes("sun")) {
        queries.push("sun", "UV");
    }

    return queries.slice(0, 5);
};

export const retrieveContext = async (query, k = 3, weatherData = null) => {
    console.log(`Step 3: Retrieving context for query: "${query}"`);
    const startTime = performance.now();

    // Expand query if weather data is provided
    let queries = [query];
    if (weatherData) {
        queries = expandQuery(
            weatherData.description || query,
            weatherData.temperature || 20,
            weatherData.windSpeed || 0
        );
    }

    console.log(`📊 Using keyword matching with ${queries.length} keywords:`, queries);

    // FAST: Use keyword matching instead of embeddings
    const scoredDocs = weatherKnowledgeBase.map(text => ({
        text: text,
        score: keywordMatch(text, queries)
    }));

    // Sort by score and filter
    scoredDocs.sort((a, b) => b.score - a.score);
    const topResults = scoredDocs
        .filter(d => d.score > 0)
        .slice(0, k)
        .map(d => {
            // Remove category prefix for cleaner display
            const cleanText = d.text.replace(/^[A-Z_]+:\s*/, '');
            return cleanText;
        });

    const endTime = performance.now();
    console.log(`✅ Retrieved ${topResults.length} tips in ${Math.round(endTime - startTime)}ms (keyword matching)`);

    return topResults.length > 0 ? topResults : [

        "Stay aware of current weather conditions and dress appropriately.",
        "Check weather forecasts regularly and plan activities accordingly.",
        "Prioritize safety in extreme weather conditions."
    ];
};
