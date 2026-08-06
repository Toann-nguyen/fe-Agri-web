# Agri-web-app — Architecture

## Monorepo Overview

The project is a pnpm workspace monorepo with two main packages:

```
/home/robert/Agri-web-app/
├── be-agri/     # Backend (NestJS + MongoDB + Redis)
└── fe-agri/     # Frontend (Bulletproof React monorepo)
    ├── apps/
    │   ├── nextjs-app/      # Next.js 14 App Router
    │   ├── nextjs-pages/    # Next.js 14 Pages Router
    │   └── react-vite/      # React 18 + Vite SPA
    ├── docs/
    │   └── overview/         # ← This directory
    └── backend-docs/         # Backend documentation (project root level)
```

## Frontend Apps Relationship

All three frontend apps share the **same feature modules** (auth, users, discussions, comments, teams, landing). They are maintained in parallel to support different deployment targets:

| App            | Build Target    | Deployment                | When to Use                                        |
| -------------- | --------------- | ------------------------- | -------------------------------------------------- |
| `nextjs-app`   | Next.js SSR/SSG | Vercel (Cloudflare Pages) | Primary app; recommended for new features          |
| `nextjs-pages` | Next.js SSR/SSG | Vercel                    | Legacy; same features as nextjs-app                |
| `react-vite`   | Static SPA      | Any static host           | Standalone deployment; same features as nextjs-app |

### Shared Code Strategy

The three apps share:

- **Feature modules** — same business logic components, API calls, and state management
- **UI components** — shared via `components/ui/` (Radix UI primitives + Tailwind)
- **Type definitions** — shared `types/` directory
- **Configuration** — similar `tailwind.config.cjs`, `tsconfig.json`, `vitest.config.ts` patterns

### Key Difference

The main difference between apps is the **routing layer**:

- `nextjs-app` uses Next.js App Router (`app/` directory)
- `nextjs-pages` uses Next.js Pages Router (`pages/` directory)
- `react-vite` uses a custom file-based router (`app/routes/`)

## Backend Architecture

### NestJS Module Structure

The backend follows a modular architecture with clear boundaries:

```
be-agri/src/
├── modules/           # Feature modules (each self-contained)
│   ├── auth/          # Authentication (JWT, OAuth, 2FA)
│   ├── user/          # User management (CRUD, profile, password)
│   ├── role/          # Role definitions and ability system
│   ├── session/       # Active session management
│   ├── activity-log/  # Audit trail
│   ├── api-key/       # External API access
│   ├── country/       # Country list (public reference data)
│   ├── email/         # Email sending via AWS SES
│   ├── feature-flag/  # Dynamic feature rollout
│   ├── health/        # Health check endpoints
│   ├── hello/         # Hello world (development)
│   ├── password-history/ # Password reuse prevention
│   ├── policy/        # RBAC policy engine
│   └── term-policy/   # Terms of service management
├── common/            # Shared infrastructure
│   ├── request/       # Guards, middlewares, interceptors, pipes
│   ├── response/      # Response formatting, pagination, caching
│   ├── database/      # Prisma service, database utilities
│   ├── file/          # File upload, S3 presigned URLs
│   ├── cache/         # Redis caching
│   ├── message/       # i18n message system
│   ├── logger/        # Structured logging
│   └── doc/           # Swagger decorators
├── router/            # Route registration with path prefixes
└── app/               # App-level config, filters, interceptors
```

### Request Flow

```
Client → /public/* → RoutesPublicModule → Controller
       → /system/* → RoutesSystemModule → Controller
       → /user/*  → RoutesUserModule   → Controller
       → /admin/* → RoutesAdminModule  → Controller
       → /shared/* → RoutesSharedModule → Controller
```

Each route prefix is processed by:

1. **Guard** — authentication/authorization check
2. **Pipe** — input validation
3. **Interceptor** — response formatting, caching, logging
4. **Controller** — business logic delegation
5. **Service** — core logic + database access
6. **Repository** — data access abstraction

### Security Layers (Order Matters)

Decorators must be applied in this exact order on controller methods:

```typescript
@ExampleDoc()
@ActivityLog(...)
@PolicyAbilityProtected({...})
@RoleProtected(...)
@TermPolicyAcceptanceProtected(...)
@UserProtected()
@AuthJwtAccessProtected()
@FeatureFlagProtected(...)
@ApiKeyProtected(...)
@HttpCode(HttpStatus.OK)
@Get('/some-endpoint')
```

## Frontend-Backend Integration

### API Client

The frontend uses a centralized API client (`lib/api-client.ts`) that:

- Attaches JWT access token to requests
- Handles 401 responses by refreshing tokens
- Formats requests/responses consistently

### Data Flow

```
Component → TanStack Query → API Client → Backend
                ↓
         Cache + Refetch
                ↓
         Component re-render
```

### Auth Flow

```
1. User submits login form
2. POST /public/login/credential
3. Backend returns access_token + refresh_token
4. Frontend stores tokens in Zustand + localStorage
5. Subsequent requests include access_token in Authorization header
6. On 401, frontend calls POST /shared/refresh with refresh_token
7. New access_token is stored; original request is retried
8. On refresh failure, user is redirected to login
```

## Key Design Decisions for UI/UX

### 1. Three-App Strategy

- **Why**: Supports different deployment targets (Vercel, static hosting, Cloudflare Pages)
- **UI/UX Impact**: New features must be implemented consistently across all 3 apps, or only in `nextjs-app` if it's the primary target

### 2. Server-Side Pagination

- **Why**: Scalable for large datasets
- **UI/UX Impact**: List views must handle loading, empty, and error states explicitly

### 3. Role-Based Access Control

- **Why**: Security and feature gating
- **UI/UX Impact**: UI must conditionally render actions based on user role (USER vs ADMIN)

### 4. React Query for Server State

- **Why**: Consistent caching, refetching, and optimistic updates
- **UI/UX Impact**: Loading states are managed by TanStack Query; use `isLoading`, `isFetching`, `isError` flags

### 5. Confirmation Dialogs for Destructive Actions

- **Why**: Prevent accidental data loss
- **UI/UX Impact**: All delete operations must use `ConfirmationDialog` component

### 6. Toast Notifications

- **Why**: Non-blocking feedback
- **UI/UX Impact**: Use `react-hot-toast` for success/error feedback after mutations
