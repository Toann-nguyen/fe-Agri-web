# Agri-web-app — Project Overview

## What Is This Project?

Agri-web-app is a monorepo that wraps two industry-standard boilerplates to provide a foundation for building an agriculture-focused web application:

| Component                 | Boilerplate            | Purpose                                                  |
| ------------------------- | ---------------------- | -------------------------------------------------------- |
| **Backend** (`be-agri/`)  | ACK NestJS Boilerplate | Enterprise-grade API with auth, RBAC, sessions, and more |
| **Frontend** (`fe-agri/`) | Bulletproof React      | Scalable React architecture with 3 app variants          |

## Business Domain

The project is named **Agri-web-app**, indicating an intended focus on agriculture. However, the current codebase contains **only generic boilerplate infrastructure** — no agriculture-specific business logic has been implemented yet.

### Intended Agriculture Use Cases (Future)

Based on the project name and structure, the expected business domains are:

- **Farmer Management** — farmer profiles, cooperatives, field assignments
- **Crop & Field Tracking** — crop types, field plots, growth stages, harvest schedules
- **Weather & Irrigation** — weather data integration, irrigation scheduling
- **Supply Chain** — input suppliers, equipment tracking, delivery coordination
- **Community/Discussions** — farmer forums, expert Q&A, knowledge sharing
- **Analytics Dashboard** — yield tracking, cost analysis, production metrics

### Current State vs. Target State

| Area                     | Current State                 | Target State                                                     |
| ------------------------ | ----------------------------- | ---------------------------------------------------------------- |
| **Auth**                 | Full JWT + social login + 2FA | Agriculture-specific roles (farmer, agronomist, admin, supplier) |
| **Users**                | CRUD with profile management  | Farmer profiles with field/plot data                             |
| **Teams**                | Read-only team list           | Farming cooperatives, work groups                                |
| **Discussions**          | Full CRUD forum               | Agricultural topic forums, expert consultations                  |
| **Comments**             | Full CRUD on discussions      | Field-specific comments, photo attachments                       |
| **Agriculture Features** | None                          | Crops, fields, weather, irrigation, harvest, soil data           |

## User Roles (Current Implementation)

The backend supports a role-based access control (RBAC) system. The frontend currently uses two roles:

| Role      | Capabilities                                                               |
| --------- | -------------------------------------------------------------------------- |
| **USER**  | Create comments in discussions, delete own comments                        |
| **ADMIN** | Create/edit/delete discussions, comment, delete all comments, manage users |

### Roles Needed for Agriculture

Future roles should include:

- **FARMER** — view fields, log crop data, participate in discussions
- **AGRONOMIST** — provide expert advice, review crop data
- **SUPPLIER** — manage product listings, view orders
- **ADMIN** — full system management (already exists)

## Key Directories

```
/home/robert/Agri-web-app/
├── be-agri/              # Backend (NestJS + MongoDB + Redis)
├── fe-agri/              # Frontend monorepo (Bulletproof React)
│   ├── apps/
│   │   ├── nextjs-app/       # Next.js App Router (primary)
│   │   ├── nextjs-pages/     # Next.js Pages Router (legacy)
│   │   └── react-vite/       # React + Vite (standalone)
│   └── docs/
│       └── overview/         # ← This directory
└── backend-docs/           # Backend-focused documentation
```

## Tech Stack Summary

- **Backend**: NestJS v11, TypeScript, MongoDB (replica set), Redis, Prisma ORM, BullMQ
- **Frontend**: Next.js 14 (App Router + Pages Router), React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Radix UI primitives, class-variance-authority
- **State**: Zustand (client state), TanStack Query v5 (server state)
- **Auth**: JWT (ES256/ES512), Redis sessions, Google/Apple OAuth, TOTP 2FA
- **Testing**: Vitest, Playwright, Jest (backend)
- **Deployment**: Vercel (frontend), Docker Compose (full stack)
