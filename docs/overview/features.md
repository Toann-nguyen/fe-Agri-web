# Agri-web-app — Implemented Features (UI/UX Notes)

This document catalogs every feature module currently implemented in the frontend, with notes relevant to UI/UX development.

---

## 1. Auth (`features/auth/`)

### Pages (Next.js App Router)

| Route                   | Component                     | Auth Required |
| ----------------------- | ----------------------------- | ------------- |
| `/auth/login`           | `login-form.tsx`              | No            |
| `/auth/register`        | `register-form.tsx`           | No            |
| `/auth/sign-up`         | `register-form.tsx` (variant) | No            |
| `/auth/forgot-password` | `forgot-password-form.tsx`    | No            |
| `/auth/reset-password`  | `reset-password-form.tsx`     | No            |
| `/auth/verify-email`    | `verify-email-status.tsx`     | No            |

### Components

| Component                  | Purpose                                  | UI/UX Notes                                                               |
| -------------------------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| `login-form.tsx`           | Email/password login                     | Uses `react-hook-form` + `zod` validation; shows toast on success/error   |
| `register-form.tsx`        | User registration                        | Same form pattern as login; includes social login buttons (Google, Apple) |
| `forgot-password-form.tsx` | Request password reset email             | Single email input; success message after submit                          |
| `reset-password-form.tsx`  | Set new password                         | Password strength validation via custom pipe                              |
| `verify-email-status.tsx`  | Show email verification status           | Status indicator with resend option                                       |
| `auth-shell.tsx`           | Layout wrapper for auth pages            | Centered card layout with background                                      |
| `auth-background.tsx`      | Decorative background for auth pages     | Canvas-based animated background                                          |
| `auth-footer-links.tsx`    | Navigation links (login/register toggle) | Simple link row                                                           |

### API Endpoints Used

- `POST /public/login/credential` — email + password login
- `POST /public/login/social/google` — Google OAuth
- `POST /public/login/social/apple` — Apple OAuth
- `POST /public/sign-up` — registration
- `PATCH /public/verify/email` — email verification
- `POST /public/send/email` — resend verification email
- `POST /public/password/forgot` — request password reset
- `PUT /public/password/reset` — submit new password
- `POST /public/login/2fa/verify` — TOTP verification
- `POST /public/login/2fa/enable` — enable 2FA
- `POST /shared/refresh` — refresh access token

### UI/UX Patterns to Reuse

- Form validation with `react-hook-form` + `zod`
- Toast notifications via `react-hot-toast`
- Centered card layout with decorative background
- Loading states on submit buttons
- Error boundary wrapping

---

## 2. Users (`features/users/`)

### Pages

| Route          | Component                            | Auth Required          |
| -------------- | ------------------------------------ | ---------------------- |
| `/app/users`   | `users-list.tsx` + `admin-guard.tsx` | Admin only             |
| `/app/profile` | `update-profile.tsx`                 | Any authenticated user |

### Components

| Component            | Purpose            | UI/UX Notes                                       |
| -------------------- | ------------------ | ------------------------------------------------- |
| `users-list.tsx`     | Table of all users | Admin-only; uses TanStack Query for data fetching |
| `update-profile.tsx` | Edit own profile   | Form with name, bio, avatar fields                |
| `delete-user.tsx`    | Delete a user      | Confirmation dialog before action                 |

### API Endpoints Used

- `GET /user/list` — list all users (admin)
- `GET /user/get/:userId` — get user details (admin)
- `POST /user/create` — create user (admin)
- `PATCH /user/update/:userId/status` — update user status (admin)
- `PUT /user/update/:userId/password` — reset user password (admin)
- `GET /shared/profile` — current user profile
- `PUT /shared/profile/update` — update current user profile
- `POST /shared/profile/generate-presign/photo` — get S3 presigned URL for avatar upload
- `PUT /shared/profile/update/photo` — upload avatar to S3

### UI/UX Patterns to Reuse

- Admin guard (`AdminGuard`) wraps protected pages
- `ContentLayout` component provides consistent page title + padding
- Confirmation dialog for destructive actions
- Table component for list views with pagination

---

## 3. Discussions (`features/discussions/`)

### Pages

| Route                                | Component              | Auth Required |
| ------------------------------------ | ---------------------- | ------------- |
| `/app/discussions`                   | `discussions-list.tsx` | Authenticated |
| `/app/discussions/[discussionId]`    | `discussion-view.tsx`  | Authenticated |
| `/public/discussions/[discussionId]` | Public discussion view | No            |

### Components

| Component               | Purpose                         | UI/UX Notes                               |
| ----------------------- | ------------------------------- | ----------------------------------------- |
| `discussions-list.tsx`  | Paginated list of discussions   | Server-side pagination via React Query    |
| `discussion-view.tsx`   | Single discussion with comments | Shows discussion content + comment thread |
| `create-discussion.tsx` | Form to create new discussion   | Admin-only; modal or page-level form      |
| `update-discussion.tsx` | Edit existing discussion        | Admin-only; same form as create           |
| `delete-discussion.tsx` | Delete a discussion             | Admin-only; confirmation dialog           |

### API Endpoints Used

- `GET /discussions` — list discussions (paginated)
- `GET /discussions/:id` — get single discussion
- `POST /discussions` — create discussion (admin)
- `PUT /discussions/:id` — update discussion (admin)
- `DELETE /discussions/:id` — delete discussion (admin)

### UI/UX Patterns to Reuse

- Paginated list with server-side pagination
- Detail view with nested comment thread
- Create/Edit forms with markdown support (uses `marked` library)
- Confirmation dialog for delete actions
- Role-based visibility (admin sees create/edit/delete; user sees read + comment)

---

## 4. Comments (`features/comments/`)

### Components

| Component            | Purpose                     | UI/UX Notes                               |
| -------------------- | --------------------------- | ----------------------------------------- |
| `comments.tsx`       | Comment thread container    | Renders list of comments for a discussion |
| `comments-list.tsx`  | List of individual comments | Shows author, timestamp, content          |
| `create-comment.tsx` | Form to add a comment       | Inline or modal form                      |
| `delete-comment.tsx` | Delete own comment          | Confirmation dialog; owner-only           |

### API Endpoints Used

- `GET /comments` — list comments for a discussion
- `POST /comments` — create comment
- `DELETE /comments/:id` — delete comment (owner only)

### UI/UX Patterns to Reuse

- Nested comment display with author info and timestamps
- Inline create form (no page navigation)
- Owner-only delete with confirmation

---

## 5. Teams (`features/teams/`)

### API Endpoints Used

- `GET /system/list` — list roles (used as team data source)

### UI/UX Notes

- Teams feature is minimal — currently only reads role list
- No dedicated UI component for teams yet
- Future implementation should display team/cooperative members with role assignments

---

## 6. Landing Page (`features/landing/`)

### Components

| Component              | Purpose                          |
| ---------------------- | -------------------------------- |
| `hero.tsx`             | Animated hero with typing effect |
| `stats-dashboard.tsx`  | Key metrics display              |
| `experience.tsx`       | Experience timeline              |
| `projects.tsx`         | Project showcase                 |
| `architecture.tsx`     | System architecture diagram      |
| `tech-stack.tsx`       | Technology stack display         |
| `expertise.tsx`        | Expertise areas                  |
| `education.tsx`        | Education background             |
| `code-showcase.tsx`    | Code snippet display             |
| `youtube-section.tsx`  | YouTube video embed              |
| `navbar.tsx`           | Navigation bar                   |
| `footer.tsx`           | Page footer                      |
| `page-background.tsx`  | Decorative background            |
| `contact-terminal.tsx` | Terminal-style contact form      |

### UI/UX Notes

- Landing page is a developer portfolio, not agriculture-focused
- Uses canvas-based animations and typing effects
- No authentication required
- Serves as the homepage (`/`)

---

## Common UI/UX Patterns Across Features

### Layout

- `ContentLayout` — consistent page wrapper with title
- `AuthShell` — centered card for auth pages
- App shell with sidebar navigation (in `app/layout.tsx`)

### Data Fetching

- TanStack Query v5 for all server state
- `dehydrate`/`HydrationBoundary` for SSR in Next.js App Router
- Query keys follow pattern `['resource']`

### Form Handling

- `react-hook-form` + `zod` for validation
- Custom form components in `components/ui/form/`
- Toast notifications for success/error feedback

### Navigation

- Role-based route guards
- Admin pages wrapped in `AdminGuard`
- Public pages accessible without auth

### Feedback

- `react-hot-toast` for success/error toasts
- `ConfirmationDialog` for destructive actions
- Loading spinners on async operations

### Error Handling

- `ErrorBoundary` for React error catching
- Standardized error responses from backend
- 404 page for unknown routes
