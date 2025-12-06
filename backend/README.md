# Skyline Estates API

Express API powering the buy / sell / rent marketplace. The service keeps a lightweight JSON store so founders can extend it with any database later.

## Available scripts

- `npm run dev` – start the API with hot reload (nodemon)
- `npm start` – production style start
- `npm run build:client` – build the Vite frontend into `frontend/dist`
- `npm run serve:full` – build the frontend and serve both UI + API on the same Express server

## Routes

| Method | Route             | Description                            |
| ------ | ----------------- | -------------------------------------- |
| GET    | `/api/health`     | Health check                           |
| GET    | `/api/listings`   | Fetch listings (supports `mode`, `search`, `city`) |
| GET    | `/api/listings/stats` | Summary metrics                    |
| POST   | `/api/listings`   | Submit a new listing                   |

### Environment

Create a `.env` file with at least `PORT=4000`. `FRONTEND_URL` is only needed when the React dev server runs separately (Vite defaults to `http://localhost:5173`).

### Data store

Seed inventory lives in `data/listings.json`. The API writes back to this file whenever a new listing is created, so your submissions instantly reflect on the home feed.
