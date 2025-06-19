# UFO Sightings Dashboard

A React + TypeScript dashboard for visualizing UFO sightings by week, built with Vite, Recharts, and Tailwind CSS.

## Demo

<img width="1512" alt="Screenshot 2025-06-19 at 02 12 21" src="https://github.com/user-attachments/assets/88c29124-f60f-4fd9-9782-c36464ec1956" />

## Features

- Fetches UFO sighting data from a public API
- Displays daily sightings in a bar chart grouped by week (Monday–Sunday)
- Week navigation (Previous/Next)
- Handles missing days gracefully (shows all days, missing days as zero sightings)
- Minimal, clean, and responsive UI (Tailwind CSS)
- Loading and error states
- Unit/component tests with Jest and React Testing Library

## Tech Stack

- React 18 + TypeScript
- Vite
- [Recharts](https://recharts.org/) (bar chart)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

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

3. **Run tests:**
   ```zsh
   npm test
   ```

## Project Structure

- `src/App.tsx` – Main dashboard logic and UI
- `src/components/` – Presentational components (Chart, Tooltip, Navigation)
- `src/constants.ts`, `src/types.ts` – Shared constants and types
- `src/index.css` – Tailwind CSS and global styles

## API Endpoint

- [UFO Sightings Data](https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings)

## Notes

- No data is hardcoded; all sightings are fetched from the API.
- The dashboard is responsive and works on mobile and desktop.
- Missing days in the dataset are shown as zero bars for that day.
- Error and loading states are handled gracefully.

---

_React Interview Task, June 2025_
