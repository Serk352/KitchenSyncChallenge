# KitchenSync Code Challenge

Dear Reader,

Welcome to my repository for the KitchenSync code challenge.

Inside this repo, you'll find two main folders, each representing a version of the requested service.

---

## 📁 `PromptService`

This folder contains the base version of the challenge — a simple service that implements CRUD operations for prompts.

- **Language & Platform**: JavaScript on Node.js.
- **Data Persistence**: Data is stored **in-memory only**, meaning it will be lost when the server restarts.
- **Setup**: You'll find a more detailed `README.md` inside this folder with installation and run instructions.
- **Insomnia**: An Insomnia import file is also included to help you test the API endpoints quickly.

---

## 📁 `PromptServiceExtended`

This is an improved version of the original service. I added several key features to better reflect what a real-world implementation might look like:

- **User Authentication System** (with login)
- **Protected Endpoints** using Bearer Tokens
- **Persistent Storage** using JSON files (instead of an actual database — to keep it simple)
- **OpenAI Integration**: 
  - A `/chat` route has been added to simulate communication with an AI agent.
  - An API key with available credits is included to test this functionality.

Like the base version, this folder also includes:
- A dedicated `README.md` with detailed usage instructions.
- An Insomnia import file to test all the features mentioned above.

---

## 🧠 Technical Decisions

### Technology Stack

I chose **Node.js** as the backend platform to align with what I understand is currently used at KitchenSync.

Regarding the use of **JavaScript** instead of TypeScript: I opted for JS to reduce complexity and focus more on functionality than strict typing. This allowed for faster development without being overly concerned with type enforcement, keeping the solution lightweight and to the point.

### Testing Approach

For testing, I chose to use **Insomnia** instead of building a frontend or custom client. This decision was based on two main reasons:

1. I understand that the goal of the challenge is to evaluate backend development. Using an external tool like Insomnia allowed me to dedicate more time to the service logic instead of client implementation.
2. Insomnia is a stable, widely-used tool that offers a reliable testing experience. Moreover, it simulates a more realistic interaction — where an external application communicates with the backend over HTTP — as opposed to internal unit tests that would run within the same codebase.

### CRUD Design

The service was built around the standard **CRUD** model — Create, Read, Update, Delete — and makes use of all the most common HTTP verbs:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`

This helps keep the code versatile and aligned with real-world REST API practices.

### Payload Structure

Payloads were intentionally kept simple and minimal, containing the following fields:

- `type`
- `prompt`
- `createdAt`
- `updatedAt`
- Optional `metadata` object

The metadata field was added with scalability in mind, in case the service needs to be extended in the future.

### Minimal vs. Extended Implementation

Another technical decision worth highlighting is the choice to provide two versions of the service:

#### 🔹 Minimal Version (`PromptService`)
This version meets only the **core requirements** described in the challenge. Optional features were deliberately left out, treating them as "nice to have" rather than required — focusing on delivering a working Minimum Viable Product (MVP).

#### 🔸 Extended Version (`PromptServiceExtended`)
Here, I approached the challenge from a **"best-case scenario"** perspective, where optional features were treated as essential. This version introduces enhancements that I believe are critical for a real-world service, such as:

- **Data persistence** across restarts (via JSON file storage)
- **Middleware**-based route protection using Bearer tokens
- **Login system** to obtain access tokens
- **User registration** endpoint

> Note: I did not implement functionality for updating user data, even though I consider it useful. I excluded it to avoid overcomplicating the project within the available time.

To speed up development and avoid reinventing the wheel, I used well-established and widely adopted libraries — for example, for JWT handling, UUID generation, and other common needs.

---

## 🤖 Use of AI

As the challenge description allowed the use of AI tools, I did choose to use AI assistance during development — but strictly as a **support tool**, not as a replacement for actual problem-solving or implementation.

My approach was to treat AI as a **development assistant**, using it for tasks such as:

- Asking specific questions like:
  - *"Do you recommend using this package for X?"*
  - *"What do you think about this function that I Wrote?"*
  - *"There's a way to reduce this code using native methods from JS?"*
- Getting help with non-technical tasks:
  - Grammar and language review for the README files
  - Styling and formatting suggestions for markdown

At no point did I rely on AI to generate or write core parts of the application. I strongly believe that the challenge is designed to evaluate **my own understanding and ability to design and build a service**, and I made sure that all architectural, technical, and coding decisions were my own.

AI served as a productivity booster — not a substitute for technical reasoning or hands-on implementation.

---
## 🙏 Closing

Thank you for taking the time to review this project. I appreciate the opportunity to demonstrate my skills and approach through this challenge.

If you have any questions, feedback, or would like to discuss any part of the implementation, please feel free to reach out. I’m always open to constructive discussions and continuous learning.

Looking forward to the possibility of contributing to KitchenSync!

---

