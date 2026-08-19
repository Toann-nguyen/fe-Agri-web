# Auth Contract — educonnect Backend ↔ fe-agri Frontend

This document specifies the **session cookie contract** between the Laravel
backend (`educonnect`) and the Next.js frontend (`fe-agri`). It is the
source of truth for the cookie-based auth refactor (Task 1).

The frontend **never** reads the access token from JavaScript. The token lives
only in an `HttpOnly` cookie set by the backend. All authenticated requests are
made with `credentials: 'include'` so the browser attaches the cookie
automatically.

## Cookie specification

| Field      | Value                                                      |
| ---------- | ---------------------------------------------------------- |
| Name       | `educonnect_session`                                       |
| Value      | JWT access token (opaque to the frontend)                  |
| `HttpOnly` | `true` (JS cannot read it → XSS-safe)                      |
| `Secure`   | `true` (HTTPS only; dev over localhost is exempt)          |
| `SameSite` | `Lax` (CSRF-protected for top-level navigations)           |
| `Path`     | `/`                                                        |
| `Max-Age`  | match token TTL (e.g. `3600` for 1h)                       |
| `Domain`   | omit (defaults to request host — avoids subdomain leakage) |

Example `Set-Cookie` on a successful login:

```
Set-Cookie: educonnect_session=eyJhbGciOi...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600
```

On logout the backend must clear it:

```
Set-Cookie: educonnect_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0
```

## Endpoints the frontend calls (all same-origin → BFF)

The Next.js app exposes BFF route handlers that proxy to the backend. The
browser only ever talks to `/api/auth/*` (same origin), so the cookie is set
on the correct domain.

| Frontend calls           | BFF proxies to (env.API_URL)  |
| ------------------------ | ----------------------------- |
| `POST /api/auth/login`   | `POST {API_URL}/auth/login`   |
| `POST /api/auth/logout`  | `POST {API_URL}/auth/logout`  |
| `POST /api/auth/refresh` | `POST {API_URL}/auth/refresh` |
| `GET  /api/auth/me`      | `GET  {API_URL}/auth/me`      |

`{API_URL}` = `NEXT_PUBLIC_API_URL` (e.g. `https://api.toanrobert.online/api`).

### Login flow

1. Frontend `POST /api/auth/login` with `{ email, password }`.
2. BFF forwards to backend `/auth/login`.
3. Backend responds `200` **and** sets `educonnect_session` cookie (HttpOnly).
4. BFF returns the user model (no token) to the client.
5. Browser now sends the cookie on every subsequent request.

### Me flow (server-side session read)

1. Frontend `useUser()` calls `GET /api/auth/me`.
2. BFF route handler reads `educonnect_session` from the request cookie and
   forwards it to `GET {API_URL}/auth/me`.
3. Backend validates the JWT and returns the user; BFF returns
   `{ authenticated: true, user }` or `{ authenticated: false }` (401).

### Refresh flow

1. If `/api/auth/me` (or any API call) returns `401`, the `api` client calls
   `POST /api/auth/refresh` (cookie still attached).
2. Backend issues a new JWT and sets a fresh `educonnect_session` cookie.
3. The original request is retried once.

## Middleware guard (frontend)

`middleware.ts` protects `/edu/*` (except `/edu/login`): if the
`educonnect_session` cookie is absent, redirect to
`/edu/login?redirectTo=<path>`. The backend remains the authority on token
validity — middleware only does a cheap presence check.

## Laravel implementation notes (no Sanctum)

Use the existing JWT Guard. In the login controller:

```php
// after validating credentials and issuing the JWT:
$cookie = cookie(
    'educonnect_session',   // name
    $token,                 // JWT string
    60,                     // minutes (== token TTL)
    '/',                    // path
    null,                   // domain (host default)
    true,                   // secure (HTTPS)
    true,                   // httpOnly
    false,                  // raw
    'Lax'                   // sameSite
);
return response()->json($user)->withCookie($cookie);
```

For logout: `return response()->json(['message' => 'ok'])->withCookie(cookie()->forget('educonnect_session'));`

For refresh: re-issue the JWT and set the cookie the same way as login.

> Note: on localhost dev the `Secure` flag is dropped automatically by the
> browser; in production it must be `true`.

## Out of scope

- Backend business logic, RBAC, and token signing are unchanged.
- This contract only governs **how the token is transported** (cookie vs
  localStorage). The frontend refactor does not modify backend code.
