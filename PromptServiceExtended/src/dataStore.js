const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR))
    fs.mkdirSync(DATA_DIR);

function createUser() {
    const initial = {
        username,
        prompts: [],
        history: []
    };
    fs.writeFileSync(file, JSON.stringify(initial, null, 2));
    return initial;
}


function getUserFile(username) {
    return path.join(DATA_DIR, `${username}.json`);
}

function loadUserData(username) {
    const file = getUserFile(username);

    if (!fs.existsSync(file)) {
        return createUser();
    }

    try {
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    } catch (err) {
        // If file corrupted, reinitialize
        return createUser();
    }
}



function saveUserData(username, data) {
    const file = getUserFile(username);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
    loadUserData,
    saveUserData
};
