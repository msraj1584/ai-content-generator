require('dotenv').config();
const { GoogleGenerativeAI } = require("generative-ai");

exports.handler = async (event, context) => {
    const apiKey = process.env.API_KEY;
    const prompt = event.queryStringParameters.prompt;

    if (!prompt) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Prompt is required" }),
        };
    }

    const genAi = new GoogleGenerativeAI(apiKey);
    const model = genAi.getGenerativeModel({
        model: "gemini-1.5-pro"
    });

    try {
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
