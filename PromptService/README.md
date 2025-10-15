# 📝 Prompt Service

A lightweight Node.js backend service built with **Express** for managing prompts. Fully supports CRUD operations in memory.

---

## 🚀 Features

- Full CRUD: Create, Read, Update, Delete prompts
- Filter and paginate prompts
- Automatic timestamps: `created_at` & `updated_at`
- In-memory storage (Map)
- Input validation for required fields

---

## 🛠️ Technologies

- Node.js
- Express 5
- UUID (for unique identifiers)
- Nodemon (dev dependency)

---

## 📦 Project Structure

promptservice/
├─ src/
│  ├─ server.js       # Main server file
│  └─ prompts.js      # CRUD routes for prompts
├─ package.json       # Project dependencies and scripts
├─ .env               # Environment variables
└─ README.md          # Project documentation

---

## ⚙️ Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Serk352/KitchenSyncChallenge.git
cd KitchenSyncChallenge/PromptService
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create a `.env` file** (optional, if you want to change default settings):

```env
PORT=3000
```

4. **Run in development mode** (hot reload with nodemon):

```bash
npm run dev
```

5. **Run in production mode**:

```bash
npm start
```

6. **Access the app**:

Open your browser or API client at: `http://localhost:3000`


