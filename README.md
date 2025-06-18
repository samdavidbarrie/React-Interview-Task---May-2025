# UFO Sightings Dashboard

A React + TypeScript dashboard for visualizing UFO sightings by week, built with Vite, Recharts, and Tailwind CSS.

## Features

- Fetches UFO sighting data from a public API
- Displays daily sightings in a bar chart grouped by week (Monday–Sunday)
- Week navigation (Previous/Next)
- Handles missing days gracefully
- Minimal, clean, and responsive UI (Tailwind CSS)
- Loading and error states

## Tech Stack

- React 18 + TypeScript
- Vite
- [Recharts](https://recharts.org/) (bar chart)
- [Tailwind CSS](https://tailwindcss.com/) (styling)

## Getting Started

1. **Install dependencies:**
   ```zsh
   npm install
   ```
2. **Start the dev server:**
   ```zsh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

- `src/App.tsx` – Main dashboard logic and UI
- `src/index.css` – Tailwind CSS and global styles

## API Endpoint

- [UFO Sightings Data](https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings)

## Notes

- No data is hardcoded; all sightings are fetched from the API.
- The dashboard is responsive and works on mobile and desktop.

---

_React Interview Task, June 2025_
