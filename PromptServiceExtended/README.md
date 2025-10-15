# 🔐 Authenticated Prompt Service with OpenAI Integration

A secure, token-authenticated Node.js backend that allows users to register, log in, manage prompt history, and interact with OpenAI's Chat API. Each user gets isolated storage for prompts and chat history.

---

## 🚀 Features

- 🔑 **JWT Authentication**: Secure endpoints with JSON Web Tokens
- 👤 **User Registration & Login**: Credentials stored with hashed passwords
- 💬 **Chat with OpenAI**: Query GPT models via `/chat`
- 📄 **Prompt CRUD**: Full Create, Read, Update, Delete operations
- 🧠 **Per-user Data Storage**: Prompts and chat history stored separately
- 📁 **Filesystem-based JSON Storage** (no database needed)

---

## 🛠️ Technologies

- Node.js
- Express 5
- JSON Web Tokens (`jsonwebtoken`)
- Password Hashing with `bcrypt`
- OpenAI API (`gpt-3.5-turbo`)
- UUID (for unique identifiers)
- Dotenv for environment config

---

## 📦 Project Structure

AuthenticatedPromptService/
├─ src/
│  ├─ server.js          # Main server file (Express setup)
│  ├─ authentication.js  # User login, register & token middleware
│  ├─ prompts.js         # Prompt CRUD routes
│  ├─ chat.js            # OpenAI integration route
│  └─ dataStore.js       # Per-user file I/O helpers
├─ .env                  # Environment variables
├─ package.json          # Dependencies & scripts
└─ README.md             # You are here

---

## ⚙️ Environment Setup

1. **Clone the repository**

```bash
git clone https://github.com/Serk352/KitchenSyncChallenge.git
cd KitchenSyncChallenge/PromptServiceExtended
```

2. **Install dependencies**

```bash
npm install
```

## 🧪 Usage

### Start the server

- **Development (with hot reload):**

```bash
npm run dev
```

- **Production:**

```bash
npm start
```

The service will be running at:  
👉 `http://localhost:3000`

---

## 🔐 Authentication Flow

1. **Register a new user**

```http
POST /register
Content-Type: application/json

{
  "username": "john",
  "password": "secret123"
}
```

2. **Login to get token**

```http
POST /login
Content-Type: application/json

{
  "username": "john",
  "password": "secret123"
}
```

> ✅ Response includes: `{ "token": "..." }`  
> Use this token in future requests:  
> `Authorization: Bearer <token>`

---

## 📚 Prompt Endpoints (Protected)

> All endpoints below require the JWT token in the `Authorization` header.

- **Create Prompt**

```http
POST /prompts
Content-Type: application/json
Authorization: Bearer <token>

{
  "type": "idea",
  "prompt": "A startup that delivers tacos by drone"
}
```

- **List Prompts (with optional filters)**

```http
GET /prompts?type=idea&limit=10&offset=0
```

- **Get Prompt by ID**

```http
GET /prompts/:id
```

- **Update Prompt (PUT or PATCH)**

```http
PUT /prompts/:id
```

```http
PATCH /prompts/:id
```

- **Delete Prompt**

```http
DELETE /prompts/:id
```

---

## 💬 Chat Endpoint (Protected)

Send a prompt and receive a response from OpenAI:

```http
POST /chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Explain quantum physics like I'm 10"
}
```

> ✅ Response:
```json
{
  "response": "Quantum physics is...",
  "raw": { ... } // Full OpenAI API response
}
```

---

## 📁 Data Persistence

- Each user has their own `.json` file in the `/data` directory.
- Stored fields include:
  - Prompts
  - Chat history
  - Timestamps for audit (created and update)

---
