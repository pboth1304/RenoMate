# RenoMate

RenoMate is a single-user home renovation planner that helps you organize projects, keep room-by-room task lists on track, and stay on top of budgets. Use it as the source of truth for your renovation data, and export readable summaries for sharing or archival.

## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Development Scripts](#development-scripts)
- [Testing Strategy](#testing-strategy)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## Key Features
- **Projects & rooms**: Create renovation projects (e.g., Kitchen Remodel) and organize them into rooms.
- **Tasks with statuses**: Manage tasks with `todo`, `in-progress`, `blocked`, and `done` states, with schedule/plan views.
- **Budgets & costs**: Set project budgets, add cost items (materials, labor, misc), and view totals, remaining budget, and over/under indicators by project or room.
- **Exports**: Generate Markdown exports for project overviews, schedules/checklists, and cost reports—ready to drop into tools like Obsidian.
- **Single-user security**: Simple authentication (e.g., GitHub OAuth) to protect access without multi-tenant complexity.

## Tech Stack
**Frontend**
- React with TypeScript
- Vite build tool
- TailwindCSS for styling
- Vitest + React Testing Library for unit/component tests
- Playwright for end-to-end tests

**Backend**
- Node.js with TypeScript
- Express.js framework
- Prisma ORM
- PostgreSQL (Neon in cloud, Dockerized Postgres locally)

**Tooling**
- ESLint, Prettier, and TypeScript for consistency and safety
- PNPM for package management

## Architecture Overview
- **Domain layer**: Pure TypeScript types and functions for projects, rooms, tasks, cost items, and calculations.
- **Data access layer**: Prisma-backed repositories that encapsulate database queries and map to domain types.
- **Backend application layer**: Services and Express controllers/routers handling validation, orchestration, and JSON responses.
- **Frontend application layer**: React components, hooks (e.g., `useProjects`, `useProjectTasks`, `useCostSummary`), and pages for project overview, task board, room details, and budget views.
- **Export layer**: Pure functions that produce Markdown for project summaries, schedules, and cost reports.

## Getting Started
1. **Prerequisites**
   - Node.js 18+
   - PNPM
   - Docker (for local Postgres)
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Environment variables**
   - Create a `.env` file based on `.env.example` (when available).
   - Configure Postgres connection, Prisma database URL, and OAuth credentials (e.g., GitHub client ID/secret).
4. **Database setup**
   - Start Postgres via Docker (for local dev) or point to Neon/cloud.
   - Run Prisma migrations when schema is available:
     ```bash
     pnpm prisma migrate dev
     ```
5. **Start the app**
   ```bash
   pnpm dev
   ```
6. **Run tests**
   ```bash
   pnpm test
   ```

## Development Scripts
- `pnpm dev`: Run frontend/backend dev servers (depending on workspace setup).
- `pnpm test`: Run unit/component/integration tests.
- `pnpm lint`: Run lint checks.
- `pnpm format`: Format code with Prettier.
- `pnpm prisma migrate dev`: Apply database migrations in development.

## Testing Strategy
- **TDD-first**: Add or adjust tests before implementing behavior.
- **Frontend**: Vitest + React Testing Library for components and hooks; Playwright for core flows.
- **Backend**: Vitest for domain logic; integration tests for Express routes and Prisma repositories using a test Postgres DB.
- **Exports**: Pure function tests that assert generated Markdown strings.

## Contributing
We welcome contributions as the project moves toward open source.
- Open an issue to propose changes or report bugs.
- Keep PRs small and focused; prefer tests-first changes.
- Follow TypeScript, React, Express, and Prisma conventions outlined above.
- Ensure linting and tests pass before submitting a PR.

## Roadmap
- Scaffold initial domain types, repositories, and services.
- Build core UI flows: project overview, task board, room detail, and budget dashboards.
- Add Markdown export flows and downloadable reports.
- Harden authentication and session management.
- Add seed data and demo mode for quick evaluation.

## License
This project is licensed under the [Apache License 2.0](./LICENSE).
