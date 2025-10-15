const express = require("express");
const promptsRouter = require("./prompts");

const app = express();

// parse JSON bodies
app.use(express.json());

//router
app.use("/prompts", promptsRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

//use port from env file or default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
    console.log(`Prompt Service running on http://localhost:${PORT}`);
  });
