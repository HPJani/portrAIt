# portrAIt - AI Portfolio Copilot

An AI-powered portfolio assistant that allows visitors to interactively explore a candidate's background, projects, skills, experience, and achievements through natural language conversation.

## Overview

portrAIt transforms a traditional resume into a conversational experience. Instead of scanning a static document, users can ask questions about the candidate and receive contextual responses generated using a Large Language Model (LLM).

The application combines a custom frontend interface with an Express.js backend and the Groq API to create an intelligent portfolio assistant.

## Features

* Natural language interaction with portfolio information
* Resume-aware AI responses
* Multiple UI themes

  * Light Theme
  * Dark Theme
  * Narc Theme
* Interactive chat interface
* About drawer for portfolio information
* Responsive frontend experience
* Secure API key management using environment variables

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### AI

* Groq API
* Llama 3.3 70B Versatile

## Project Structure

├── index.html
├── style.css
├── main_script.js
├── server.js
├── systemPrompt.md
├── Himanshu_Pahilajani_Resume_with_ranka.md
├── graphic.jpg
├── graphic_dark.png
├── resume_to_ai_illustration.svg
├── package.json
└── README.md

## How It Works

1. User enters a question in the chat interface.
2. The frontend sends the query to the Express backend.
3. The backend loads:

   * System instructions
   * Portfolio data
4. The query is forwarded to the Groq API.
5. The generated response is returned to the frontend and displayed in the chat window.

## Local Setup

### Prerequisites

* Node.js
* npm
* Groq API Key

### Installation

Clone the repository:

git clone https://github.com/HPJani/portrAIt.git

Install dependencies:

npm install

Create a `.env` file:

GROQ_API_KEY=your_api_key_here

Start the server:

npm start

Open the frontend in a browser and begin interacting with the assistant.

## Deployment

### Backend

* Render

### Frontend

* Vercel

Environment Variables:

GROQ_API_KEY

## Future Improvements

* Streaming AI responses
* Chat history persistence
* Resume retrieval using embeddings/RAG
* Voice interaction
* Typing indicators and loading animations
* Analytics dashboard
* Enhanced mobile responsiveness

## Author

Himanshu Pahilajani

Built as part of an AI Portfolio Copilot assignment to explore how conversational AI can transform static portfolios into interactive experiences.
