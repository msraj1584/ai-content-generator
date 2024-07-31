require('dotenv').config();
const { GoogleGenerativeAI } = require("generative-ai");

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        
        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Prompt is required" }),
            };
        }

        const apiKey = process.env.API_KEY;
        const genAi = new GoogleGenerativeAI(apiKey);
        const model = genAi.getGenerativeModel({
            model: "gemini-1.5-pro"
        });

        const response = await model.generateContent(prompt);
        return {
            statusCode: 200,
            body: JSON.stringify({ text: response.text }),
        };
    } catch (error) {
        console.error("Error generating content:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate content" }),
        };
    }
};
