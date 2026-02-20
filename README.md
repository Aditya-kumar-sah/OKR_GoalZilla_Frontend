
# OKR — Frontend

A lightweight React + Vite frontend for creating and managing OKRs (Objectives and Key Results).

## Features

- Create, edit and delete Objectives (OKRs)
- Add, edit and remove Key Results for each Objective
- AI-assisted OKR generation (component: `AiGeneratedOkr`)
- Context-driven state management via `OkrProvider` and `KeyResultListProvider`
- Responsive UI styled with Tailwind CSS

## Tech stack & versions

- React: 19.2.0
- Vite: 7.2.4
- TypeScript: ~5.9.3
- Tailwind CSS: 4.1.18
- Axios: 1.13.4
- json-server: 1.0.0-beta.5
- Prettier: 3.8.1
- ESLint: 9.39.1
- Lucide React icons: 0.563.0
- uuid: 13.0.0

These versions come from `package.json` and reflect the development environment used by this repository.

## Quick start

1. Clone the repository:

```bash
git clone https://github.com/Aditya-kumar-sah/OKR_GoalZilla_Frontend
cd OKR_GoalZilla_Frontend
```

2. Install dependencies:

```bash
npm install
````

3. Start the development server:

```bash
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`) to view the app.

If you prefer `yarn` or `pnpm`, substitute the equivalent commands (e.g., `yarn`, `yarn dev`, `pnpm install`, `pnpm dev`).

## Project structure (high level)

- `src/` — application source
	- `components/` — React components (OkrList, OkrForm, KeyResultsList, etc.)
	- `context/` — providers for OKR and Key Result state

---
