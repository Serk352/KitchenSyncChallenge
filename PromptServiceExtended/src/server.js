const express = require("express");
require('dotenv').config();
const promptsRouter = require("./prompts");
const chatRouter = require("./chat");
const {
    authenticateToken,
    loginHandler,
    registerHandler
} = require("./authentication");

const app = express();

// parse JSON
app.use(express.json());

// Public routes
//create/register user
app.post("/register", registerHandler);
//makes login
app.post("/login", loginHandler);

// Protected routes
//added authenticateToken as midleware to secure endpoints
app.use("/prompts", authenticateToken, promptsRouter);
app.use("/chat", authenticateToken, chatRouter);

// Error handler (fallback)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

//use port from env file or default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Service running on http://localhost:${PORT}`);
});
