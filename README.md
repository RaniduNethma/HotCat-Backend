# HotCat - Backend

Smart Orders, Happier Tables.

Welcome to the backend of the HotCat project!

## What is HotCat?

HotCat is a restaurant management web application designed to streamline dining experiences. Built with a Node.js & Express backend, React frontend, and MySQL database, it enables smart order handling, menu management, and efficient customer–restaurant interactions. The goal is to deliver a seamless, tech-powered dining experience.

## Prerequisites

Before you can start using this project, make sure you have the following installed on your local machine:

- Node.js
- npm
- MySQL

## Getting Started

Follow these steps to get started with the HotCat backend:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/YOUR_USERNAME/HotCat-Backend.git
   cd HotCat-Backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` file as `.env`:

   ```bash
   cp .env.example .env  #For Linux and macos
   ```

4. Replace the environment variables in the newly created `.env` file with your configurations.

5. Start the server:

   ```bash
   npm start
   ```

6. Run Tests:

   ```bash
   npm test
   ```

7. Open your web browser and navigate to `http://localhost:${server_port}` to access the running server.

## Project Structure

Here's an overview of the project structure:

```
HotCat-backend/
├── src/
│   ├── controllers/
│   │   └── index.ts
│   ├── middleware/
│   │   └── index.ts
│   ├── routes/
│   │   └── index.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── entities/
│   │   └── profile.entity.ts
│   ├── index.ts
│   └── types.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
