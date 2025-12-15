/**
 * Embedding Cache Generator
 * 
 * This script pre-generates embeddings for all knowledge base entries
 * and saves them to a JSON file for fast loading.
 * 
 * Run once: node scripts/generateEmbeddings.js
 * Re-run whenever knowledge base is updated.
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import knowledge base
const knowledgeDataPath = path.join(__dirname, '../src/data/knowledgeData.js');
const knowledgeModule = await import(knowledgeDataPath);
const weatherKnowledgeBase = knowledgeModule.weatherKnowledgeBase;

const OLLAMA_API_URL = 'http://localhost:11434/api/embeddings';
const MODEL_NAME = 'nomic-embed-text'; // Faster embedding model
const OUTPUT_FILE = path.join(__dirname, '../src/data/embeddingsCache.json');

// Generate embedding for a single text
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

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.embedding;
    } catch (error) {
        console.error(`Error generating embedding for: "${text.substring(0, 50)}..."`, error.message);
        return null;
    }
};

// Main function
const generateAllEmbeddings = async () => {
    console.log('🚀 Starting Embedding Cache Generation');
    console.log('='.repeat(60));
    console.log(`📚 Knowledge Base: ${weatherKnowledgeBase.length} entries`);
    console.log(`🤖 Model: ${MODEL_NAME}`);
    console.log(`💾 Output: ${OUTPUT_FILE}`);
    console.log('='.repeat(60));
    console.log('');

    // Check if Ollama is running
    try {
        const testResponse = await fetch('http://localhost:11434/api/tags');
        if (!testResponse.ok) {
            throw new Error('Ollama not responding');
        }
        console.log('✅ Ollama is running');
    } catch (error) {
        console.error('❌ Error: Ollama is not running!');
        console.error('Please start Ollama first: ollama serve');
        process.exit(1);
    }

    // Check if model exists
    try {
        const testEmbedding = await generateEmbedding('test');
        if (!testEmbedding) {
            throw new Error('Model not available');
        }
        console.log(`✅ Model "${MODEL_NAME}" is available`);
    } catch (error) {
        console.error(`❌ Error: Model "${MODEL_NAME}" not found!`);
        console.error(`Please install it first: ollama pull ${MODEL_NAME}`);
        process.exit(1);
    }

    console.log('');
    console.log('⏳ Generating embeddings...');
    console.log('This will take 2-3 minutes. Please wait...');
    console.log('');

    const vectorStore = [];
    const startTime = Date.now();
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < weatherKnowledgeBase.length; i++) {
        const text = weatherKnowledgeBase[i];
        const progress = ((i + 1) / weatherKnowledgeBase.length * 100).toFixed(1);

        // Show progress
        process.stdout.write(`\r[${i + 1}/${weatherKnowledgeBase.length}] ${progress}% - Processing...`);

        const embedding = await generateEmbedding(text);

        if (embedding) {
            vectorStore.push({ text, embedding });
            successCount++;
        } else {
            failCount++;
        }

        // Small delay to avoid overwhelming Ollama
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);

    console.log('\n');
    console.log('='.repeat(60));
    console.log('✅ Embedding generation complete!');
    console.log(`⏱️  Duration: ${duration} seconds`);
    console.log(`✅ Success: ${successCount} embeddings`);
    if (failCount > 0) {
        console.log(`❌ Failed: ${failCount} embeddings`);
    }
    console.log('='.repeat(60));
    console.log('');

    // Save to file
    console.log('💾 Saving to file...');
    try {
        const jsonData = JSON.stringify(vectorStore, null, 2);
        fs.writeFileSync(OUTPUT_FILE, jsonData, 'utf8');

        const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
        console.log(`✅ Saved to: ${OUTPUT_FILE}`);
        console.log(`📦 File size: ${fileSize} KB`);
    } catch (error) {
        console.error('❌ Error saving file:', error.message);
        process.exit(1);
    }

    console.log('');
    console.log('='.repeat(60));
    console.log('🎉 All done! Your app will now load instantly!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Next steps:');
    console.log('1. Restart your dev server (npm run dev)');
    console.log('2. The app will now load embeddings from cache');
    console.log('3. First load should be <0.5 seconds!');
    console.log('');
    console.log('💡 Tip: Re-run this script whenever you update knowledgeData.js');
};

// Run the script
generateAllEmbeddings().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
