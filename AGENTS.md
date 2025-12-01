# AGENTS.md – RenoMate Project Instructions

You are an AI software engineering assistant (Codex, Copilot, etc.) working on the **RenoMate** project.

RenoMate is **not** an AI product.  
AI is only used to assist the developer with design, implementation, and tests.

---

## Project Overview

**RenoMate** is a personal **home renovation planner** web application.

Core goals:

- Help the user **plan renovation projects**
  - Define projects (e.g. “Kitchen Renovation”)
  - Organize projects into **rooms** (Kitchen, Bathroom, etc.)
  - Manage **tasks** with statuses:
    - `todo`, `in-progress`, `blocked`, `done`
  - Provide a **plan/schedule view** (timeline / list of tasks over time)

- Help the user **track costs & budget**
  - Define **project budgets**
  - Add **cost items** (materials, labor, misc)
  - Show **summary views**:
    - total cost
    - remaining budget
    - over-/under-budget indicator
  - Separate cost views by **project** and **room**

- Help the user **review & export data**
  - Generate **Markdown exports** for:
    - Project overview
    - Task schedule / checklist
    - Cost & budget report
  - These exports can be stored in **Obsidian** or any cloud storage
  - RenoMate is the **source of truth** for structured data; exports are read-only views

The app is **single-user** (the owner).  
Authentication is required (e.g. GitHub OAuth) to protect access, but multi-tenant complexity is *not* needed.

---

## Tech Stack

### Frontend

- **Framework**: React (with TypeScript)
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Frontend Testing**:
  - **Vitest**
  - **React Testing Library** for component tests
- **E2E / Click Testing**:
  - **Playwright**

### Backend

- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**:
  - Postgres
  - Cloud: **Neon** (primary)
  - Local dev/test: Postgres via Docker

### Auth (high level)

- Simple **GitHub OAuth** (or similar) implemented in Express
- Only the owner needs access; treat it as a single-user app
- Use session-based or JWT-based auth – keep it simple and maintainable

---

## Architectural Guidelines

Strive for a clean, layered design. When generating or modifying code, prefer this structure:

1. **Domain layer (pure logic)**
   - TypeScript types and functions for:
     - `Project`, `Room`, `Task`, `CostItem`
     - Cost summary calculations
     - Task/schedule logic
   - No direct imports from Express, React, or Prisma
   - These modules should be easy to unit test with Vitest

2. **Data access layer (repositories)**
   - Prisma-backed repositories for each aggregate:
     - e.g. `ProjectRepository`, `TaskRepository`, `CostRepository`
   - Encapsulate all database queries here
   - Map between domain types and Prisma models

3. **Backend application layer**
   - Services that orchestrate domain logic + repositories
   - Express route handlers/controllers:
     - Parse/validate requests
     - Call services
     - Return JSON responses
   - Keep controllers thin and focused

4. **Frontend application layer**
   - React components and hooks:
     - Hooks like `useProjects`, `useProjectTasks`, `useCostSummary`
     - Pages/views: project overview, task board, room details, budget/cost overview
   - Use TailwindCSS utility classes in JSX

5. **Export layer**
   - Pure functions that take domain data and return Markdown strings:
     - `buildProjectSummaryMarkdown(project, tasks, costs)`
     - `buildScheduleMarkdown(project, tasks)`
     - `buildCostReportMarkdown(project, costs)`
   - No I/O here; just string building

---

## TDD – Test-Driven Development (Critical)

**TDD is a core working agreement for this project.**

### Planning Phase Requirement (NEW)

For **every change**, before writing or modifying any code or tests:

1. The agent must produce a **Planning Section** that outlines:
   - What it intends to change
   - Which files will be touched
   - Which tests will be added or modified
   - Why the change is necessary  
2. The agent must **present this plan to the developer** and **wait for explicit confirmation** before proceeding.

This planning phase is mandatory.

---

### Tests-First Workflow

When you propose or generate changes, follow these rules:

1. **Prefer tests-first**
   - For any new behavior or bug fix:
     - Add or update **tests first**, then implement code
   - Domain logic:
     - Pure unit tests (Vitest)
   - Backend endpoints:
     - Integration tests (Vitest + HTTP client)
   - Frontend components:
     - React Testing Library

2. **Small, incremental changes**
   - Avoid large, multi-feature edits
   - **If the agent believes the change set is too large or risky, it must stop and ask for confirmation before continuing.**
   - Prefer:
     - Add/adjust tests
     - Implement just enough to make tests pass
     - Refactor afterward

3. **Test appropriate layers**
   - **Domain layer:** pure unit tests, no DB or network  
   - **Repository layer:** integration tests with a test Postgres DB  
   - **Express routes:** route-level tests hitting endpoints, checking JSON & status codes  
   - **React components:** test interaction & visible DOM behavior  
   - **E2E:** only for core, critical flows

4. **Refactor with green tests**
   - Once tests pass, improve structure and readability
   - Keep behavior constant unless tests are intentionally updated

5. **Never bypass tests**
   - If a change requires new behavior, add or modify tests first
   - Do not introduce major logic without coverage

---

## Coding Conventions

### General TypeScript

- Use TypeScript everywhere
- Prefer explicit types for public functions
- Avoid `any` unless necessary and scoped tightly

### React + Tailwind

- Use functional components and hooks
- Use React Testing Library (never Enzyme)
- Test from a user's perspective (text, roles, labels, interactions)
- Use Tailwind utility classes directly in JSX

### Express

- Organize routes by feature
- Keep controllers thin
- Use services and domain logic for non-trivial computation
- Use centralized error handling where appropriate

### Prisma

- Keep schema clean and documented
- Use migrations for schema changes
- Repository functions should produce domain-friendly output

---

## Working Agreements for Codex / SWE Agent

When operating in this repository:

- Follow **this AGENTS.md** as persistent guidance
- Stick to the defined stacks:
  - **React + Tailwind + Vite** (frontend)
  - **Express + Prisma + Postgres** (backend)
  - **Vitest + React Testing Library** (tests)
  - **Playwright** (E2E)
- **Do not introduce other frameworks** unless explicitly requested
- Prefer solutions that:
  1. Support **TDD**
  2. Keep tests simple and clear
  3. Maintain a clean architecture
  4. Keep change size small and confirm before large edits
  5. Begin every task with a clear **planning section**

When in doubt:
- Ask for clarification
- Present a small plan
- Wait for approval before making code changes
