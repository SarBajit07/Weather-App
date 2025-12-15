# 🌦️ AI-Powered Weather Agent

A next-generation weather application that goes beyond simple forecasts. This project integrates **Local LLMs (Ollama)**, **RAG (Retrieval-Augmented Generation)**, and **Agentic Workflows** to provide personalized weather briefings, safety tips, and lifestyle recommendations.

## ✨ Key Features

- **Real-Time Weather Data**: Fetches accurate weather information for any city.
- **🤖 AI Weather Briefings**: Uses a custom-tuned Local LLM (`weather-expert`) to generate witty, context-aware advice using **Chain of Thought (CoT)** reasoning.
- **📚 RAG Pipeline**: Retrieves relevant safety tips from a local knowledge base based on current weather conditions (e.g., specific advice for "extreme heat" or "stormy" weather).
- **🕵️ ReAct Agent**: Includes an autonomous agent mode that can "think" and use tools to answer complex queries (e.g., "Search for London and check safety tips").
- **⚡ Hybrid Retrieval**: Implements a fast keyword-matching system (optimized for local performance) with fallback to vector embeddings.
- **History Tracking**: Keeps a log of your recent searches and AI interactions.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **AI / LLM**: [Ollama](https://ollama.com/) (running Llama 3 locally)
- **Architecture**: RAG (Retrieval-Augmented Generation), ReAct (Reasoning + Acting)
- **Styling**: CSS Modules / Vanilla CSS

## 🧠 RAG & AI Pipeline

This project demonstrates a fully local RAG implementation:

1. **Knowledge Base**: A curated set of weather safety tips and guidelines (`src/data/knowledgeData.js`).
2. **Retrieval**:
   - The system analyzes current weather conditions (Temperature, Wind, Description).
   - It retrieves the most relevant safety tips using a hybrid keyword/scoring algorithm (`src/services/vectorService.js`).
3. **Augmentation**:
   - The retrieved tips are injected into a dynamic prompt along with real-time weather data.
4. **Generation**:
   - The `weather-expert` model (customized Llama 3) processes the prompt.
   - It uses **Chain of Thought** to analyze the data step-by-step before outputting a JSON response with recommendations.

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v16+)
2. **Ollama**: Download and install from [ollama.com](https://ollama.com/).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SarBajit07/Weather-App.git
   cd weather-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Ollama Model**
   This project uses a custom model file. Run the following to create the `weather-expert` model:
   ```bash
   # Pull the base model first
   ollama pull llama3

   # Create the custom model
   ollama create weather-expert -f Modelfile
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

## 📂 Project Structure
src/components: UI Components (Weather display, History, etc.) src/services: aiService.js: Handles interactions with Ollama and the ReAct agent loop. vectorService.js: Implements the retrieval logic (RAG). src/data: Contains the static knowledge base and embeddings cache. scripts: Node.js scripts for offline processing (e.g., generating embeddings). Modelfile: Configuration for the custom AI persona.

## 🤝 Contributing

Feel free to fork this project and submit PRs. You can extend the knowledge base in `src/data/knowledgeData.js` or tweak the AI persona in `Modelfile`.
