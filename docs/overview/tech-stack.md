# Agri-web-app — Tech Stack

## Frontend (`fe-agri/`)

### Monorepo Structure

The frontend is a pnpm workspace with 3 applications under `apps/`:

| App            | Framework       | Router        | Purpose                                            |
| -------------- | --------------- | ------------- | -------------------------------------------------- |
| `nextjs-app`   | Next.js 14      | App Router    | Primary application (recommended for new features) |
| `nextjs-pages` | Next.js 14      | Pages Router  | Legacy compatibility, same features as nextjs-app  |
| `react-vite`   | React 18 + Vite | Custom router | Standalone SPA, same features as nextjs-app        |

### Core Libraries

| Library                  | Version  | Purpose                                |
| ------------------------ | -------- | -------------------------------------- |
| React                    | ^18.3.1  | UI library                             |
| Next.js                  | ^14.2.5  | SSR/SSG framework (nextjs-app only)    |
| Vite                     | —        | Build tool (react-vite only)           |
| TypeScript               | ^5.4.5   | Type safety                            |
| Tailwind CSS             | ^3.4.3   | Utility-first CSS                      |
| TanStack Query           | ^5.32.0  | Server state management, data fetching |
| Zustand                  | ^4.5.2   | Client state management                |
| React Hook Form          | ^7.51.3  | Form handling with validation          |
| Zod                      | ^3.23.4  | Schema validation                      |
| Radix UI                 | —        | Accessible component primitives        |
| Lucide React             | ^0.378.0 | Icon library                           |
| Iconify React            | ^6.0.2   | Icon framework                         |
| class-variance-authority | ^0.7.0   | Component variant management           |
| clsx + tailwind-merge    | —        | Class name composition                 |
| React Hot Toast          | ^2.6.0   | Toast notifications                    |

### Routing Structure (nextjs-app)

```
/app
├── page.tsx                    → Landing page (public)
├── auth/
│   ├── login/page.tsx          → Login page
│   ├── register/page.tsx       → Registration page
│   ├── sign-up/page.tsx        → Sign-up variant
│   ├── forgot-password/page.tsx→ Password reset request
│   ├── reset-password/page.tsx → Password reset form
│   └── verify-email/page.tsx   → Email verification status
├── app/
│   ├── page.tsx                → Dashboard (authenticated)
│   ├── discussions/
│   │   ├── page.tsx            → Discussions list
│   │   └── [discussionId]/
│   │       └── page.tsx        → Discussion detail view
│   ├── users/
│   │   └── page.tsx            → Users management (admin)
│   └── profile/
│       └── page.tsx            → User profile
└── public/
    └── discussions/
        └── [discussionId]/
            └── page.tsx        → Public discussion view
```

### Feature Modules

| Module        | Components                                                                                                                 | API Calls                                                                                                                     | Auth Required          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `auth`        | login-form, register-form, forgot-password-form, reset-password-form, verify-email-status, auth-shell                      | `/public/login/credential`, `/public/sign-up`, `/public/password/forgot`, `/public/password/reset`, `/shared/refresh`         | No (except refresh)    |
| `users`       | users-list, update-profile, delete-user                                                                                    | `/user/list`, `/user/get/:userId`, `/user/create`, `/user/update/:userId/status`, `/shared/profile`, `/shared/profile/update` | Yes (admin for CRUD)   |
| `teams`       | get-teams                                                                                                                  | `/system/list` (roles)                                                                                                        | Yes                    |
| `discussions` | discussions-list, discussion-view, create-discussion, update-discussion, delete-discussion                                 | `/discussions` (CRUD)                                                                                                         | Yes (admin for write)  |
| `comments`    | comments-list, create-comment, delete-comment                                                                              | `/comments` (CRUD)                                                                                                            | Yes (owner for delete) |
| `landing`     | hero, stats-dashboard, experience, projects, architecture, tech-stack, expertise, education, code-showcase, navbar, footer | None (static)                                                                                                                 | No                     |

### State Management

- **Server State**: TanStack Query v5 — all API data is fetched and cached via React Query
- **Client State**: Zustand — auth session, UI state (toasts, modals)
- **Auth Flow**: Zustand store manages token + user data; React Query handles server data synchronization

## Backend (`be-agri/`)

### Core Stack

| Technology        | Version     | Purpose                                                  |
| ----------------- | ----------- | -------------------------------------------------------- |
| NestJS            | v11.x       | Backend framework                                        |
| TypeScript        | v5.9.x      | Type safety                                              |
| MongoDB           | v8.0.x      | Primary database (replica set required for transactions) |
| Prisma ORM        | v6.19.x     | Database toolkit and migrations                          |
| Redis             | v8.0.x      | Session storage, caching, rate limiting                  |
| BullMQ            | —           | Background job queue                                     |
| JWT               | ES256/ES512 | Access/refresh token signing                             |
| AWS SES           | —           | Transactional email                                      |
| AWS S3            | —           | File storage with presigned URLs                         |
| Sentry            | —           | Error tracking and monitoring                            |
| Swagger/OpenAPI 3 | —           | Auto-generated API docs                                  |

### Module Architecture

```
be-agri/src/
├── modules/
│   ├── auth/           → JWT, social login, 2FA, session management
│   ├── user/           → User CRUD, profile, password management
│   ├── role/           → Role definitions and ability system
│   ├── session/        → Active session management (Redis)
│   ├── activity-log/   → Audit trail
│   ├── api-key/        → External API access control
│   ├── country/        → Country list (public)
│   ├── email/          → Email sending (SES)
│   ├── feature-flag/   → Dynamic feature rollout
│   ├── health/         → Health check endpoints
│   ├── hello/          → Hello world endpoint
│   ├── password-history/→ Password reuse prevention
│   ├── policy/         → RBAC policy engine
│   └── term-policy/    → Terms of service acceptance
├── common/             → Shared utilities (request, response, database, file, cache, etc.)
├── router/             → Route modules with path prefixes
└── app/                → App-level config, filters, interceptors
```

### API Route Prefixes

| Prefix    | Module                                                                                              | Access Level    |
| --------- | --------------------------------------------------------------------------------------------------- | --------------- |
| `/public` | Country, Hello, User (login/signup), Term Policy                                                    | Unauthenticated |
| `/system` | User system ops, Health, Feature Flags, Role abilities                                              | Authenticated   |
| `/user`   | User profile, password operations                                                                   | User-level auth |
| `/admin`  | User CRUD, Roles, Sessions, Activity Logs, API Keys, Password History, Term Policies, Feature Flags | Admin auth      |
| `/shared` | Cross-access operations                                                                             | Multiple roles  |

### Database Schema (Prisma)

The backend uses MongoDB via Prisma. Key entities relevant to frontend features:

- **User** — id, email, profile (full_name, bio, avatar), roles[], password hash, 2FA config
- **Role** — id, name, abilities[]
- **Session** — id, userId, token, expiresAt, device info
- **ActivityLog** — id, userId, action, entity, timestamp
- **PasswordHistory** — id, userId, hash, createdAt
- **TermPolicy** — id, content (multilingual), status, version
- **ApiKey** — id, userId, key, permissions, expiresAt
