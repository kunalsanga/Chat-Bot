const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyA_rF9TDZruVbZC-XtQS71LAfphQLE6i7o');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Serve static files from the public directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 