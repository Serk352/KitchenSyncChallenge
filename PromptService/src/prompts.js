const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
// in-memory store
const prompts = new Map();

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
    const {
        type,
        prompt,
        metadata = null
    } = req.body || {};

    if (!type || !prompt)
        return res.status(400).json({ error: "Fields 'type' and 'prompt' are required." });

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

    prompts.set(id, record);
    res.status(201).json(record);
});

// List with optional filter & pagination --> R(ead)
router.get("/", (req, res) => {
    const {
        type,
        limit = 100,
        offset = 0
    } = req.query;

    let items = Array.from(prompts.values());

    if (type)
        items = items.filter((p) => p.type === type);

    const start = Math.max(0, parseInt(offset) || 0);
    const end = start + Math.min(Math.max(1, parseInt(limit) || 100), 1000);
    res.json(items.slice(start, end));
});

// Get specific by id --> R(ead)
router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (!prompts.has(id))
        return res.status(404).json({ error: "Prompt not found." });

    res.json(prompts.get(id));
});

// Replace (PUT)  --> U(pdate)
router.put("/:id", (req, res) => {
    const { id } = req.params;

    if (!prompts.has(id))
        return res.status(404).json({ error: "Prompt not found." });

    const {
        type,
        prompt,
        metadata = null
    } = req.body || {};

    if (!type || !prompt)
        return res.status(400).json({ error: "Fields 'type' and 'prompt' are required." });


    const existing = prompts.get(id);

    const updated = {
        id,
        type,
        prompt,
        metadata,
        created_at: existing.created_at,
        updated_at: nowISO(),
    };

    prompts.set(id, updated);
    res.json(updated);
});

// (PATCH) --> U(pdate)
router.patch("/:id", (req, res) => {
    const { id } = req.params;

    if (!prompts.has(id))
        return res.status(404).json({ error: "Prompt not found." });

    const existing = prompts.get(id);
    const allowed = [
        "type",
        "prompt",
        "metadata"
    ];
    //check for allowed fields to be updated
    for (const key of allowed) {
        if (Object.prototype.hasOwnProperty.call(req.body, key))
            existing[key] = req.body[key];
    }

    existing.updated_at = nowISO();
    prompts.set(id, existing);
    res.json(existing);
});

//--> D(elete)
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (!prompts.has(id))
        return res.status(404).json({ error: "Prompt not found." });

    prompts.delete(id);
    res.status(204).send();
});

module.exports = router;