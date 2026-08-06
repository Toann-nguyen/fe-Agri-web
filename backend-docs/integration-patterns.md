# ACK NestJS Boilerplate — Frontend Integration Patterns

This document describes how the three frontend apps (nextjs-app, nextjs-pages, react-vite) consume the backend API.

## API Client Setup

### Location

`fe-agri/apps/nextjs-app/src/lib/api-client.ts` (shared pattern across all 3 apps)

### Configuration

The API client is configured with:

- Base URL from environment variable
- JWT access token attached automatically via interceptor
- 401 response handling (token refresh flow)
- Request/response interceptors for logging and error formatting

### Usage

```typescript
import { api } from '@/lib/api-client';

// GET request
const { data } = await api.get('/shared/profile');

// POST request
const { data } = await api.post('/discussions', {
  title: 'New Discussion',
  content: 'Discussion content',
});

// PUT request
const { data } = await api.put('/shared/profile/update', {
  full_name: 'Updated Name',
});

// DELETE request
await api.delete('/discussions/:id');
```

## TanStack Query Integration

### Query Options Pattern

Each feature module has an `api/` directory with query options:

```typescript
// features/discussions/api/get-discussions.ts
export const getDiscussionsQueryOptions = ({ page }: { page: number }) => {
  return queryOptions({
    queryKey: ['discussions', { page }],
    queryFn: () => api.get('/discussions', { params: { page } }),
  });
};
```

### Component Usage

```typescript
// In a component
const { data, isLoading, isError } = useQuery(
  getDiscussionsQueryOptions({ page: 1 }),
);
```

### Mutation Pattern

```typescript
const queryClient = useQueryClient();

const { mutate, isPending } = useMutation({
  mutationFn: (newDiscussion: CreateDiscussionDto) =>
    api.post('/discussions', newDiscussion),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['discussions'] });
    toast.success('Discussion created');
  },
  onError: () => {
    toast.error('Failed to create discussion');
  },
});
```

## Auth Integration

### Zustand Store

The auth state is managed via a Zustand store (`lib/auth.tsx`):

```typescript
// Hook to access current user
const user = useUser();

// Returns: { id, email, name, role, bio, avatar, createdAt }
```

### Token Storage

Tokens are stored in both Zustand (in-memory) and localStorage (persisted):

```typescript
import { setToken, getToken } from '@/lib/token-store';
```

### Auth Guard Pattern

The `AuthGuard` component protects routes that require authentication:

```tsx
// app/layout.tsx or route-level guard
<AuthGuard>
  <DashboardPage />
</AuthGuard>
```

### Admin Guard Pattern

The `AdminGuard` component restricts access to admin-only pages:

```tsx
<ContentLayout title='Users'>
  <AdminGuard>
    <Users />
  </AdminGuard>
</ContentLayout>
```

## SSR Data Fetching (Next.js App Router)

The `nextjs-app` uses React Query's `dehydrate`/`HydrationBoundary` for SSR:

```typescript
// app/discussions/page.tsx
const DiscussionsPage = async ({ searchParams }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getDiscussionsQueryOptions({
      page: searchParams.page ? Number(searchParams.page) : 1,
    })
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Discussions />
    </HydrationBoundary>
  );
};
```

## File Upload Pattern

File uploads use a two-step process:

1. **Get presigned URL**: `POST /shared/profile/generate-presign/photo`
2. **Upload to S3**: PUT request to the presigned URL

```typescript
// Step 1: Get presigned URL
const { data } = await api.post('/shared/profile/generate-presign/photo');
const presignedUrl = data.url;

// Step 2: Upload file directly to S3
await fetch(presignedUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': file.type },
});

// Step 3: Update profile with S3 URL
await api.put('/shared/profile/update/photo', { photoUrl: data.fileUrl });
```

## Error Handling

### Backend Error Response Format

The backend returns standardized error responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Frontend Error Handling

```typescript
try {
  await api.post('/discussions', data);
  toast.success('Discussion created');
} catch (error) {
  toast.error(error.response?.data?.message || 'Something went wrong');
}
```

## React Vite App Integration

The `react-vite` app uses the same API client and patterns but with a custom file-based router:

```
app/routes/
├── auth/
│   ├── login.tsx
│   ├── register.tsx
│   └── ...
├── app/
│   ├── dashboard.tsx
│   ├── discussions/
│   │   ├── discussions.tsx
│   │   └── discussion.tsx
│   ├── profile.tsx
│   └── users.tsx
└── landing.tsx
```

## Key Differences Between Apps

| Aspect       | nextjs-app                        | nextjs-pages                        | react-vite                                   |
| ------------ | --------------------------------- | ----------------------------------- | -------------------------------------------- |
| Router       | Next.js App Router                | Next.js Pages Router                | Custom file-based                            |
| SSR          | `HydrationBoundary` + `dehydrate` | `dehydrate` in `getServerSideProps` | No SSR (SPA)                                 |
| API client   | Same                              | Same                                | Same                                         |
| Auth         | Same Zustand store                | Same Zustand store                  | Same Zustand store                           |
| Routing file | `app/discussions/page.tsx`        | `pages/app/discussions/index.tsx`   | `app/routes/app/discussions/discussions.tsx` |

## UI/UX Implications

1. **New features should be added to `nextjs-app` first** — it's the primary app
2. **API calls must follow the existing patterns** — use the centralized `api` client and React Query
3. **Loading states are handled by React Query** — use `isLoading`, `isFetching`, `isError` flags
4. **Toast notifications** — use `react-hot-toast` for all user feedback
5. **Confirmation dialogs** — use the `ConfirmationDialog` component for destructive actions
6. **Role-based rendering** — check `user.role` before showing admin-only UI elements
7. **File uploads** — follow the presigned URL pattern (get URL → upload to S3 → update profile)
