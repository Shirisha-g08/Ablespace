# AbleSpace Assignment - Task Management System

This repository contains a complete full stack implementation for the AbleSpace technical assessment.

## Stack
- Frontend: Next.js 14 (App Router), Tailwind CSS, TypeScript
- Backend: NestJS, TypeScript
- Database: SQLite (via TypeORM)
- Authentication: Guest login with JWT

## Features Implemented
- Guest login flow (`POST /auth/guest`)
- JWT-protected task APIs
- Task CRUD with status and priority
- Theme switcher with persistent preference (`localStorage`)
- Responsive UI across desktop/tablet/mobile
- Reusable frontend components
- Validation using `class-validator` and global validation pipes

## Project Structure

```
apps/
  backend/   # NestJS API
  frontend/  # Next.js UI
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy env values (optional, defaults are already safe for local use):
```bash
copy .env.example .env
```

3. Run backend:
```bash
npm run dev:backend
```

4. In another terminal run frontend:
```bash
npm run dev:frontend
```

5. Open `http://localhost:3000`

## API Summary
- `POST /auth/guest` - creates a guest user and returns JWT
- `GET /tasks` - list tasks for current guest user
- `POST /tasks` - create task
- `PATCH /tasks/:id` - update task
- `DELETE /tasks/:id` - delete task

All `/tasks` endpoints require `Authorization: Bearer <token>`.

## Assignment Notes
- Theme preferences persist through refreshes.
- Designed component hierarchy to maximize reusability:
  - `ThemeProvider`, `ThemeSwitcher`
  - `GuestLoginCard`
  - `TaskBoard`
  - `TaskModal`

### Figma Fidelity Note
I implemented the UI with close visual parity principles (spacing, cards, hierarchy, responsive behavior, and themed design system). Since this implementation was coded from scratch without design tokens exported directly from Figma, slight differences in exact typography values, illustration assets, and micro-interactions may exist.

## Part 2 Submission
Part 2 notes are in `PART2_Product_Understanding.md`.

## Suggested Commit Plan
To align with the requirement of multiple small meaningful commits, commit in this sequence:
1. `chore: scaffold monorepo and configs`
2. `feat(backend): add guest auth and task APIs`
3. `feat(frontend): add theme system and guest login`
4. `feat(frontend): implement task board and task modal`
5. `docs: add setup and part2 product understanding`

## Deployment
Suggested quick deployment:
- Frontend: Vercel
- Backend: Render / Railway / Fly.io
- Database: SQLite volume for local demos, or switch to PostgreSQL for hosted production
