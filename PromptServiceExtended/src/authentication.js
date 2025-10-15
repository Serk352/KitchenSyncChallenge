const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const SECRET = process.env.JWT_SECRET || "fallbackSecret123";
const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// Ensure data dir and users file exist
if (!fs.existsSync(DATA_DIR))
    fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(USERS_FILE))
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));

function readUsers() {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Middleware to verify token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        return res.status(401).json({ error: "Token required" });

    jwt.verify(token, SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ error: "Invalid token" });

        req.user = { id: user.id, username: user.username };
        next();
    });
}

//login handler
function loginHandler(req, res) {
    const {
        username,
        password
    } = req.body || {};
    
    if (!username || !password)
        return res.status(400).json({ error: "username and password required" });

    const usersList = readUsers();
    const user = usersList.find((u) => u.username === username);

    if (!user)
        return res.status(400).json({ error: "User not found" });

    if (!bcrypt.compareSync(password, user.passwordHash))
        return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({
         id: user.id, 
         username: user.username 
        }, SECRET, {
        expiresIn: "6h",
    });
    res.json({ token });
}

// Register handler
function registerHandler(req, res) {
    const {
        username,
        password
    } = req.body || {};
    if (!username || !password)
        return res.status(400).json({ error: "username and password required" });

    const usersList = readUsers();

    if (usersList.find(u => u.username === username))
        return res.status(400).json({ error: "User already exists" });

    //auto update id
    const id = (usersList.length ? Math.max(...usersList.map(u => u.id)) + 1 : 1);
    //hash password for security
    const passwordHash = bcrypt.hashSync(password, 10);

    const newUser = {
        id,
        username,
        passwordHash
    };

    usersList.push(newUser);
    saveUsers(usersList);

    //per-user file with initial structure
    const userFile = path.join(DATA_DIR, `${username}.json`);
    const initial = {
        username,
        prompts: [],
        history: []
    };
    fs.writeFileSync(userFile, JSON.stringify(initial, null, 2));

    res.status(201).json({ msg: "User created" });
}

module.exports = {
    authenticateToken,
    loginHandler,
    registerHandler
};
