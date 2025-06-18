const OpenAI = require("openai");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function requestOpenAi(messages) {
    const response = await openai.chat.completions.create({
        model: "gpt-4", // Or gpt-3.5-turbo
        messages: messages
    });
    return response.choices[0].message.content;
}

const chatController = async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await requestOpenAi([{ role: "user", content: message }]);
        res.json({ reply: completion });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Ошибка при обработке запроса" });
    }
};


module.exports = chatController; 