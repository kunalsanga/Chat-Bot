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
        // Use the original prompt without additional context
        const result = await model.generateContent(prompt);
        
        // Post-process the response to ensure clarity
        let responseText = result.response.text().trim();
        
        // Additional text processing for clarity
        responseText = responseText.replace(/\s+/g, ' '); // Remove extra spaces
        responseText = responseText.replace(/(\r\n|\n|\r)/gm, ''); // Remove newlines
        responseText = responseText.charAt(0).toUpperCase() + responseText.slice(1); // Capitalize first letter
        
        // Remove unwanted symbols (example: keep only alphanumeric and basic punctuation)
        responseText = responseText.replace(/[^a-zA-Z0-9.,!? ]/g, ''); // Adjust regex as needed
        
        res.json({ response: responseText });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Serve static files from the public directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 