# ACK NestJS Boilerplate — Backend Documentation

## Overview

The backend (`be-agri/`) is built on the **ACK NestJS Boilerplate**, a production-ready NestJS v11 foundation designed for enterprise applications. It provides authentication, authorization, session management, and a modular architecture ready for domain-specific extensions.

This backend serves the Agri-web-app frontend (fe-agri).

## Quick Facts

| Detail          | Value                                                  |
| --------------- | ------------------------------------------------------ |
| Framework       | NestJS v11.x                                           |
| Language        | TypeScript v5.9.x                                      |
| Database        | MongoDB v8.0.x (replica set required for transactions) |
| ORM             | Prisma v6.19.x                                         |
| Cache/Session   | Redis v8.0.x                                           |
| Job Queue       | BullMQ                                                 |
| Auth            | JWT (ES256 Access, ES512 Refresh) + Redis sessions     |
| Email           | AWS SES                                                |
| File Storage    | AWS S3 with presigned URLs                             |
| API Docs        | Swagger/OpenAPI 3 (disabled in production)             |
| Test Framework  | Jest                                                   |
| Package Manager | pnpm                                                   |

## Module Inventory

| Module             | Purpose                             | Key Controllers                                                                                                               |
| ------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `auth`             | JWT, OAuth, 2FA, session management | (No controllers — provides guards/services used by user module)                                                               |
| `user`             | User CRUD, profile, password, 2FA   | `user.public.controller`, `user.user.controller`, `user.admin.controller`, `user.system.controller`, `user.shared.controller` |
| `role`             | Role definitions and ability system | `role.admin.controller`, `role.system.controller`                                                                             |
| `session`          | Active session management           | `session.admin.controller`, `session.shared.controller`                                                                       |
| `activity-log`     | Audit trail                         | `activity-log.admin.controller`, `activity-log.shared.controller`                                                             |
| `api-key`          | External API access control         | `api-key.admin.controller`                                                                                                    |
| `country`          | Country reference data              | `country.public.controller`                                                                                                   |
| `email`            | Transactional email via AWS SES     | (Service only)                                                                                                                |
| `feature-flag`     | Dynamic feature rollout             | `feature-flag.admin.controller`, `feature-flag.system.controller`                                                             |
| `health`           | Health check endpoints              | `health.system.controller`                                                                                                    |
| `hello`            | Hello world (development)           | `hello.public.controller`                                                                                                     |
| `password-history` | Password reuse prevention           | `password-history.admin.controller`, `password-history.shared.controller`                                                     |
| `policy`           | RBAC policy engine                  | (No controllers — provides guards/decorators)                                                                                 |
| `term-policy`      | Terms of service acceptance         | `term-policy.public.controller`, `term-policy.admin.controller`, `term-policy.shared.controller`                              |

## Route Prefixes

| Prefix    | Module                                                 | Access          |
| --------- | ------------------------------------------------------ | --------------- |
| `/public` | User (login/signup), Country, Hello, Term Policy       | Unauthenticated |
| `/system` | User system ops, Health, Feature Flags, Role abilities | Authenticated   |
| `/user`   | User profile, password operations                      | User-level auth |
| `/admin`  | User CRUD, Roles, Sessions, Activity Logs, etc.        | Admin auth      |
| `/shared` | Cross-access operations (refresh, profile, etc.)       | Multiple roles  |

## Key Integrations for Frontend

- **Auth**: Frontend sends credentials to `/public/login/credential`, receives JWT pair, stores in Zustand + localStorage
- **Profile**: Frontend calls `/shared/profile` and `/shared/profile/update` for user data
- **File Upload**: Frontend gets presigned URL from `/shared/profile/generate-presign/photo`, then uploads directly to S3
- **Real-time**: Not yet implemented (future: WebSocket or SSE for notifications)

## What's Missing for Agriculture

The backend currently has **no agriculture-specific modules**. To support the Agri-web-app business domain, the following modules would need to be added:

- `crop` — Crop types, growth stages, harvest schedules
- `field` — Field plots, soil data, irrigation records
- `weather` — Weather data integration
- `cooperative` — Farming cooperatives, team management
- `supplier` — Input suppliers, product catalog
- `equipment` — Equipment tracking and maintenance
- `analytics` — Yield tracking, cost analysis, production metrics
