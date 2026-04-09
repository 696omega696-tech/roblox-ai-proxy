const express = require('express');
const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;
    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 200,
                system: "Tu es un assistant dans un jeu Roblox. Réponds en français, de façon courte.",
                messages: [{ role: "user", content: question }]
            })
        });
        const data = await response.json();
        res.json({ reponse: data.content[0].text });
    } catch (err) {
        res.json({ reponse: "Erreur de connexion..." });
    }
});

app.listen(3000, () => console.log("Serveur actif !"));
