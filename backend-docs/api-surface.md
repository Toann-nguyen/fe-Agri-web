# ACK NestJS Boilerplate — API Surface

This document catalogs all available backend API endpoints organized by module and access level.

## Public Routes (`/public`)

### Authentication

| Method  | Endpoint                      | Description                  | Auth Required |
| ------- | ----------------------------- | ---------------------------- | ------------- |
| `POST`  | `/public/login/credential`    | Email/password login         | No            |
| `POST`  | `/public/login/social/google` | Google OAuth login           | No            |
| `POST`  | `/public/login/social/apple`  | Apple OAuth login            | No            |
| `POST`  | `/public/sign-up`             | User registration            | No            |
| `PATCH` | `/public/verify/email`        | Verify email address         | No            |
| `POST`  | `/public/send/email`          | Resend verification email    | No            |
| `POST`  | `/public/password/forgot`     | Request password reset email | No            |
| `PUT`   | `/public/password/reset`      | Submit new password          | No            |
| `POST`  | `/public/login/2fa/verify`    | TOTP 2FA verification        | No            |
| `POST`  | `/public/login/2fa/enable`    | Enable 2FA for account       | No            |

### User (Public)

| Method | Endpoint                 | Description                 | Auth Required |
| ------ | ------------------------ | --------------------------- | ------------- |
| `GET`  | `/public/list`           | List public user info       | No            |
| `POST` | `/public/check/username` | Check username availability | No            |
| `POST` | `/public/check/email`    | Check email availability    | No            |

### Term Policy

| Method | Endpoint       | Description                 | Auth Required |
| ------ | -------------- | --------------------------- | ------------- |
| `GET`  | `/public/list` | List accepted term policies | No            |

### Country

| Method | Endpoint       | Description    | Auth Required |
| ------ | -------------- | -------------- | ------------- |
| `GET`  | `/public/list` | List countries | No            |

### Hello

| Method | Endpoint        | Description          | Auth Required |
| ------ | --------------- | -------------------- | ------------- |
| `GET`  | `/public/hello` | Hello world endpoint | No            |

## System Routes (`/system`)

### User System

| Method | Endpoint                 | Description                   | Auth Required |
| ------ | ------------------------ | ----------------------------- | ------------- |
| `GET`  | `/system/list`           | List all users (system-level) | Authenticated |
| `POST` | `/system/check/username` | Check username availability   | Authenticated |
| `POST` | `/system/check/email`    | Check email availability      | Authenticated |

### Health

| Method | Endpoint         | Description  | Auth Required |
| ------ | ---------------- | ------------ | ------------- |
| `GET`  | `/system/health` | Health check | No            |

### Feature Flags

| Method | Endpoint                | Description               | Auth Required |
| ------ | ----------------------- | ------------------------- | ------------- |
| `GET`  | `/system/feature-flags` | List active feature flags | Authenticated |

### Role System

| Method | Endpoint                              | Description              | Auth Required |
| ------ | ------------------------------------- | ------------------------ | ------------- |
| `GET`  | `/system/roles/list`                  | List all roles           | Authenticated |
| `GET`  | `/system/roles/get/:roleId/abilities` | Get abilities for a role | Authenticated |

## User Routes (`/user`)

### User Profile

| Method | Endpoint                               | Description                     | Auth Required      |
| ------ | -------------------------------------- | ------------------------------- | ------------------ |
| `POST` | `/user/refresh`                        | Refresh access token            | No (refresh token) |
| `GET`  | `/user/profile`                        | Get current user profile        | User-level auth    |
| `PUT`  | `/user/profile/update`                 | Update current user profile     | User-level auth    |
| `POST` | `/user/profile/generate-presign/photo` | Get S3 presigned URL for avatar | User-level auth    |
| `PUT`  | `/user/profile/update/photo`           | Upload avatar to S3             | User-level auth    |

## Admin Routes (`/admin`)

### User Admin

| Method  | Endpoint                          | Description         | Auth Required |
| ------- | --------------------------------- | ------------------- | ------------- |
| `GET`   | `/admin/list`                     | List all users      | Admin         |
| `GET`   | `/admin/get/:userId`              | Get user by ID      | Admin         |
| `POST`  | `/admin/create`                   | Create new user     | Admin         |
| `PATCH` | `/admin/update/:userId/status`    | Update user status  | Admin         |
| `PUT`   | `/admin/update/:userId/password`  | Reset user password | Admin         |
| `PATCH` | `/admin/update/:userId/2fa/reset` | Reset user 2FA      | Admin         |
| `POST`  | `/admin/import`                   | Import users (bulk) | Admin         |
| `POST`  | `/admin/export`                   | Export users (bulk) | Admin         |

### Role Admin

| Method   | Endpoint                      | Description     | Auth Required |
| -------- | ----------------------------- | --------------- | ------------- |
| `GET`    | `/admin/roles/list`           | List all roles  | Admin         |
| `GET`    | `/admin/roles/get/:roleId`    | Get role by ID  | Admin         |
| `POST`   | `/admin/roles/create`         | Create new role | Admin         |
| `PUT`    | `/admin/roles/update/:roleId` | Update role     | Admin         |
| `DELETE` | `/admin/roles/delete/:roleId` | Delete role     | Admin         |

### Session Admin

| Method   | Endpoint                            | Description              | Auth Required |
| -------- | ----------------------------------- | ------------------------ | ------------- |
| `GET`    | `/admin/sessions/list`              | List all active sessions | Admin         |
| `DELETE` | `/admin/sessions/revoke/:sessionId` | Revoke a session         | Admin         |

### Activity Log Admin

| Method | Endpoint                    | Description        | Auth Required |
| ------ | --------------------------- | ------------------ | ------------- |
| `GET`  | `/admin/activity-logs/list` | List activity logs | Admin         |

### Password History Admin

| Method | Endpoint                       | Description           | Auth Required |
| ------ | ------------------------------ | --------------------- | ------------- |
| `GET`  | `/admin/password-history/list` | List password history | Admin         |

### Term Policy Admin

| Method   | Endpoint                                                   | Description            | Auth Required |
| -------- | ---------------------------------------------------------- | ---------------------- | ------------- |
| `GET`    | `/admin/term-policies/list`                                | List all term policies | Admin         |
| `POST`   | `/admin/term-policies/create`                              | Create term policy     | Admin         |
| `DELETE` | `/admin/term-policies/delete/:termPolicyId`                | Delete term policy     | Admin         |
| `POST`   | `/admin/term-policies/get/:termPolicyId/content/:language` | Get policy content     | Admin         |
| `PATCH`  | `/admin/term-policies/publish/:termPolicyId`               | Publish term policy    | Admin         |

### API Key Admin

| Method | Endpoint                 | Description    | Auth Required |
| ------ | ------------------------ | -------------- | ------------- |
| `GET`  | `/admin/api-keys/list`   | List API keys  | Admin         |
| `POST` | `/admin/api-keys/create` | Create API key | Admin         |

### Feature Flag Admin

| Method | Endpoint                      | Description         | Auth Required |
| ------ | ----------------------------- | ------------------- | ------------- |
| `GET`  | `/admin/feature-flags/list`   | List feature flags  | Admin         |
| `POST` | `/admin/feature-flags/create` | Create feature flag | Admin         |

## Shared Routes (`/shared`)

### User Shared

| Method | Endpoint                                 | Description                 | Auth Required      |
| ------ | ---------------------------------------- | --------------------------- | ------------------ |
| `POST` | `/shared/refresh`                        | Refresh access token        | No (refresh token) |
| `GET`  | `/shared/profile`                        | Get current user profile    | Authenticated      |
| `PUT`  | `/shared/profile/update`                 | Update current user profile | Authenticated      |
| `POST` | `/shared/profile/generate-presign/photo` | Get S3 presigned URL        | Authenticated      |
| `PUT`  | `/shared/profile/update/photo`           | Upload avatar               | Authenticated      |

### Password History Shared

| Method | Endpoint                        | Description                          | Auth Required |
| ------ | ------------------------------- | ------------------------------------ | ------------- |
| `GET`  | `/shared/password-history/list` | List current user's password history | Authenticated |

### Activity Log Shared

| Method | Endpoint                     | Description                       | Auth Required |
| ------ | ---------------------------- | --------------------------------- | ------------- |
| `GET`  | `/shared/activity-logs/list` | List current user's activity logs | Authenticated |

### Session Shared

| Method   | Endpoint                             | Description                  | Auth Required |
| -------- | ------------------------------------ | ---------------------------- | ------------- |
| `GET`    | `/shared/sessions/list`              | List current user's sessions | Authenticated |
| `DELETE` | `/shared/sessions/revoke/:sessionId` | Revoke own session           | Authenticated |

### Term Policy Shared

| Method | Endpoint                              | Description            | Auth Required |
| ------ | ------------------------------------- | ---------------------- | ------------- |
| `GET`  | `/shared/term-policies/list/accepted` | List accepted policies | Authenticated |
| `POST` | `/shared/term-policies/accept`        | Accept a term policy   | Authenticated |

## Frontend API Consumption Pattern

The frontend uses a centralized API client (`lib/api-client.ts`) that:

1. Attaches `Authorization: Bearer <access_token>` header to all requests
2. Intercepts 401 responses and attempts token refresh via `/shared/refresh`
3. Retries the original request after refresh
4. Redirects to login if refresh fails

### Example Request Flow

```typescript
import { api } from '@/lib/api-client';

// Get current user profile
const { data } = await api.get('/shared/profile');

// Update profile
const { data } = await api.put('/shared/profile/update', {
  full_name: 'New Name',
  bio: 'Updated bio',
});
```
