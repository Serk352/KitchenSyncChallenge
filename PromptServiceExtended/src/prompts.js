const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { loadUserData, saveUserData } = require("./dataStore");

const router = express.Router();

const nowISO = () => new Date().toISOString();

/*
Prompt object shape:
{
  id: "uuid",
  type: "PROMPT TYPE",
  prompt: "text",
  metadata: optional object,
  created_at: ISOString,
  updated_at: ISOString
}
*/

//--> C(reate)
router.post("/", (req, res) => {
      console.log("Authenticating token...");
    const {
        type,
        prompt,
        metadata = null
    } = req.body || {};

    if (!type || !prompt)
        return res.status(400).json({ error: "Fields 'type' and 'prompt' are required." });

    const username = req.user && req.user.username;

    if (!username) return res.status(401).json({ error: "Unauthenticated" });

    const data = loadUserData(username);

    const id = uuidv4();
    const ts = nowISO();

    const record = {
        id,
        type,
        prompt,
        metadata,
        created_at: ts,
        updated_at: ts,
    };

    data.prompts.push(record);
    saveUserData(username, data);
    res.status(201).json(record);
});

// List (with optional filter & pagination) --> R(ead)
router.get("/", (req, res) => {
    const {
        type,
        limit = 100,
        offset = 0
    } = req.query;

    const username = req.user && req.user.username;

    if (!username)
        return res.status(401).json({ error: "Unauthenticated" });

    const data = loadUserData(username);
    let items = Array.isArray(data.prompts) ? data.prompts : [];

    if (type)
        items = items.filter((p) => p.type === type);

    const start = Math.max(0, parseInt(offset) || 0);
    const end = start + Math.min(Math.max(1, parseInt(limit) || 100), 1000);
    res.json(items.slice(start, end));
});

// Get specific by id --> R(ead)
router.get("/:id", (req, res) => {
    const username = req.user && req.user.username;
    if (!username)
        return res.status(401).json({ error: "Unauthenticated" });

    const { id } = req.params;
    const data = loadUserData(username);
    const found = (data.prompts || []).find(p => p.id === id);
    if (!found)
        return res.status(404).json({ error: "Prompt not found." });

    res.json(found);
});

// (PUT)  --> U(pdate)
router.put("/:id", (req, res) => {
    const {
        type,
        prompt,
        metadata = null
    } = req.body || {};

    if (!type || !prompt)
        return res.status(400).json({ error: "Fields 'type' and 'prompt' are required." });

    const username = req.user && req.user.username;
    if (!username)
        return res.status(401).json({ error: "Unauthenticated" });

    const { id } = req.params;
    const data = loadUserData(username);
    const idx = (data.prompts || []).findIndex(p => p.id === id);

    if (idx === -1)
        return res.status(404).json({ error: "Prompt not found." });

    const existing = data.prompts[idx];
    const updated = {
        id,
        type,
        prompt,
        metadata,
        created_at: existing.created_at,
        updated_at: nowISO(),
    };

    data.prompts[idx] = updated;
    saveUserData(username, data);
    res.json(updated);
});

// (PATCH) --> U(pdate)
router.patch("/:id", (req, res) => {
    const username = req.user && req.user.username;
    if (!username)
        return res.status(401).json({ error: "Unauthenticated" });

    const { id } = req.params;
    const data = loadUserData(username);
    const idx = (data.prompts || []).findIndex(p => p.id === id);
    if (idx === -1)
        return res.status(404).json({ error: "Prompt not found." });

    const existing = data.prompts[idx];
    const allowed = [
        "type",
        "prompt",
        "metadata"
    ];
    for (const key of allowed) {
        //check for allowed fields to be updated
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
            existing[key] = req.body[key];
        }
    }
    existing.updated_at = nowISO();
    data.prompts[idx] = existing;
    saveUserData(username, data);
    res.json(existing);
});

// --> D(elete)
router.delete("/:id", (req, res) => {
    const username = req.user && req.user.username;
    if (!username)
        return res.status(401).json({ error: "Unauthenticated" });

    const { id } = req.params;
    const data = loadUserData(username);
    const idx = (data.prompts || []).findIndex(p => p.id === id);
    if (idx === -1)
        return res.status(404).json({ error: "Prompt not found." });

    data.prompts.splice(idx, 1);
    saveUserData(username, data);
    res.status(204).send();
});

module.exports = router;
