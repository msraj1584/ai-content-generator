require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require("generative-ai");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the "public" directory

app.get('/generate-content', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const prompt = req.query.prompt;
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }
    const genAi = new GoogleGenerativeAI(apiKey);
    const model = genAi.getGenerativeModel({
        model: "gemini-1.5-pro"
    });

    try {
        const content = await model.generateContent(prompt);
        res.json({ text: content.response.text() });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
