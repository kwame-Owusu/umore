# Umore

**Umore** is a mood-tracking application built to help users log their emotional states over time, spot trends, and gain insights into their mental well-being. It offers a clean UI for recording moods, viewing past entries, and visualizing changes over time.

Umore means 'mood' or 'state of being' in italian, which is one the languages I speak.

---

## Features

- Add mood entries (e.g. “happy,” “sad,” “anxious”) with optional notes
- View a timeline or calendar-style history of mood logs
- Visualize weekly insights
- Filter or search through past entries (by date or mood )
- API-driven backend + decoupled frontend architecture for flexibility and scalability

---

## Tech Stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| Frontend           | TypeScript, React                               |
| Backend / API      | Node.js / Express( using typescript on backend) |
| Database / Storage | MongoDB                                         |
| Tooling & Build    | ESLint, Prettier,Vite                           |

---

## Demo

## Installation & Setup

Below is a generic setup guide. Adapt paths, configuration, and tooling depending on your environment.

### 1. Clone the repository

```bash
git clone https://github.com/kwame-Owusu/umore.git
cd backend

npm install

```

### 2. ENV setup

```bash
PORT=5000 or any port you prefer
MONGO_CONNECTION_URL=<MONGODB_CONNECTION_URL>
JWT_SECRET=<64 characters or more for your jwt secret>
CLIENT_URL=<FRONTEND_CLIENT_URL>
```

both backend and frontend servers can be run with:

```
npm run dev
```

### Thoughts

I made this project because I haven't made any full stack web app project before,
and also because I wanted a tool to express my thoughts and how I feel after a working day.

It was fun making this project and seeing it come together, don't know where to go from here, might deploy it later.
