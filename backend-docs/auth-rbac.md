# ACK NestJS Boilerplate — Auth & RBAC

## Authentication Flow

### Token Types

| Token         | Algorithm | Purpose                  | Lifetime              |
| ------------- | --------- | ------------------------ | --------------------- |
| Access Token  | ES256     | Authorize API requests   | Short-lived (minutes) |
| Refresh Token | ES512     | Obtain new access tokens | Longer-lived (days)   |

### Login Flow

```
1. User submits email + password
2. POST /public/login/credential
3. Backend validates credentials
4. Backend generates access_token (ES256) + refresh_token (ES512)
5. Backend stores refresh_token in Redis session
6. Backend returns both tokens to frontend
7. Frontend stores tokens in Zustand + localStorage
8. Frontend attaches access_token to subsequent requests
```

### Token Refresh Flow

```
1. Access token expires
2. Frontend receives 401 response
3. Frontend calls POST /shared/refresh with refresh_token
4. Backend validates refresh_token against Redis
5. Backend issues new access_token + refresh_token pair
6. Frontend stores new tokens
7. Frontend retries original request with new access_token
```

### Social Login Flow

```
1. User clicks Google/Apple login button
2. Frontend redirects to social provider
3. Provider redirects back with auth code
4. Frontend sends code to POST /public/login/social/google (or apple)
5. Backend exchanges code for user info from provider
6. Backend creates/links user account
7. Backend returns JWT pair
8. Frontend stores tokens and proceeds
```

### 2FA (TOTP) Flow

```
1. User enables 2FA: POST /public/login/2fa/enable
2. Backend generates TOTP secret, returns QR code URI
3. User scans QR code with authenticator app
4. User submits TOTP code: POST /public/login/2fa/verify
5. Backend validates TOTP, marks 2FA as enabled
6. On subsequent logins, user must provide TOTP code
```

## Role-Based Access Control (RBAC)

### Role System

The backend uses a **policy-based RBAC** system:

1. **Roles** are defined in the `role` module (e.g., `USER`, `ADMIN`)
2. **Abilities** are attached to roles via the policy engine
3. **Guards** check if the current user's role has the required ability

### Current Roles

| Role    | Description                                                               |
| ------- | ------------------------------------------------------------------------- |
| `USER`  | Standard user — can read discussions, create comments, update own profile |
| `ADMIN` | Administrator — full CRUD on discussions, user management, system config  |

### How Roles Are Used in the Frontend

The frontend fetches the current user's role from the `/shared/profile` endpoint:

```typescript
const { data } = await api.get('/shared/profile');
// data.roles[0] → 'USER' | 'ADMIN'
```

The dashboard page (`/app`) displays role-specific capabilities:

```tsx
{
  user.data?.role === 'USER' && (
    <ul>
      <li>Create comments in discussions</li>
      <li>Delete own comments</li>
    </ul>
  );
}
{
  user.data?.role === 'ADMIN' && (
    <ul>
      <li>Create discussions</li>
      <li>Edit discussions</li>
      <li>Delete discussions</li>
      <li>Comment on discussions</li>
      <li>Delete all comments</li>
    </ul>
  );
}
```

### Role-Based UI Patterns

| UI Element        | USER Role        | ADMIN Role                     |
| ----------------- | ---------------- | ------------------------------ |
| Discussion list   | Read only        | Read + Create                  |
| Discussion detail | Read + Comment   | Read + Comment + Edit + Delete |
| User management   | Not visible      | Visible with full CRUD         |
| Profile edit      | Own profile only | Own profile + manage others    |

## Auth Guards (Backend)

| Guard                       | Purpose                          | Applied To               |
| --------------------------- | -------------------------------- | ------------------------ |
| `AuthJwtAccessGuard`        | Validates access token           | All authenticated routes |
| `AuthJwtRefreshGuard`       | Validates refresh token          | `/shared/refresh`        |
| `RoleGuard`                 | Checks role-based permissions    | Admin routes             |
| `PolicyAbilityGuard`        | Checks ability-based permissions | Policy-protected routes  |
| `TermPolicyAcceptanceGuard` | Ensures user accepted terms      | Term-protected routes    |
| `ApiKeyGuard`               | Validates API key                | API key-protected routes |
| `FeatureFlagGuard`          | Checks feature flag status       | Feature-flagged routes   |

## Decorator Stack Order

When applying multiple protection decorators, they **must** be in this order:

```typescript
@ExampleDoc()                    // 1. Swagger doc
@ActivityLog(...)                // 2. Audit logging
@PolicyAbilityProtected({...})   // 3. Ability check
@RoleProtected(...)              // 4. Role check
@TermPolicyAcceptanceProtected() // 5. Terms acceptance
@UserProtected()                 // 6. User exists check
@AuthJwtAccessProtected()        // 7. JWT validation
@FeatureFlagProtected(...)       // 8. Feature flag check
@ApiKeyProtected(...)            // 9. API key check
@HttpCode(HttpStatus.OK)         // 10. HTTP status
@Get('/some-endpoint')           // 11. Route definition
```

## Frontend Auth State Management

The frontend manages auth state via Zustand:

```typescript
// lib/auth.tsx
const user = useUser(); // Zustand hook
const token = getToken(); // localStorage
```

### Auth State Shape

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: string; // 'USER' | 'ADMIN'
  bio: string;
  avatar?: string;
  createdAt: number;
}
```

## UI/UX Implications for Agriculture Features

When adding agriculture-specific roles, the following UI patterns will be needed:

1. **Role selector** during registration (farmer, agronomist, supplier, admin)
2. **Role-based navigation** — show/hide menu items based on role
3. **Role-based form access** — certain fields/actions only for specific roles
4. **Role-based dashboard** — different views for different roles
5. **Permission-based component rendering** — use a `Can` component or similar pattern

### Recommended Frontend Pattern

```tsx
// Reusable permission check
const { data: user } = useUser();
const canEdit = user?.role === 'ADMIN' || user?.role === 'AGRONOMIST';

{
  canEdit && <EditButton />;
}
```
