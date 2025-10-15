const express = require("express");
const {
    loadUserData,
    saveUserData
} = require("./dataStore");
const router = express.Router();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

if (!OPENAI_KEY)
    console.warn("Warning: OPENAI_API_KEY not set. ");


const nowISO = () =>
    new Date().toISOString();

/*
Request:
{ "prompt": "text..." }

Response:
{ "response": "AI text ", "raw": {...} }
*/
router.post("/", async (req, res) => {
    const username = req.user && req.user.username;

    if (!username)
        return res.status(401).json({ error: "Unauthenticated" });

    const { prompt } = req.body || {};

    if (!prompt)
        return res.status(400).json({ error: "Field 'prompt' required" });

    if (!OPENAI_KEY)
        return res.status(500).json({ error: "Server misconfigured: OPENAI_API_KEY missing" });

    try {
        // Build request for Chat Completions
        const body = {
            model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 800,
            //Creativity vs accuracy:  0 ->  the most accurate 1-> creative
            temperature: 0.7
        };

        const resp = await fetch(OPENAI_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!resp.ok) {
            const text = await resp.text();
            console.error("OpenAI error:", resp.status, text);
            return res.status(502).json({ error: "Error from OpenAI", details: text });
        }

        const data = await resp.json();

        // Extract assistant message
        const assistantMsg = data.choices &&
            data.choices[0] &&
            data.choices[0].message &&
            data.choices[0].message.content
            ? data.choices[0].message.content
            : (data.choices && data.choices[0] && data.choices[0].text) || "";

        // Save into user's history
        const userData = loadUserData(username);

        userData.history = userData.history || [];

        const entry = {
            id: (userData.history.length ? (userData.history.length + 1) : 1),
            prompt,
            response: assistantMsg,
            raw: data,
            created_at: nowISO()
        };
        userData.history.push(entry);
        saveUserData(username, userData);

        res.json({ response: assistantMsg, raw: data });

    } catch (err) {
        console.error("chat handler error:", err);
        res.status(500).json({ error: "Internal server error in /chat" });
    }
});

module.exports = router;
