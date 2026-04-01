# Project Structure - React Vite

## Overview

Dự án React Vite sử dụng Vite làm build tool, React Router cho routing, và TanStack Query (React Query) để quản lý state cho API. Dưới đây là chi tiết cấu trúc thư mục và vai trò của từng thành phần.

## Thư mục chính

```
react-vite/
├── src/                    # Thư mục chứa source code chính
├── public/                 # Static assets
├── e2e/                    # End-to-end tests (Playwright)
├── generators/             # Plop generators cho component
├── .storybook/             # Storybook configuration
└── __mocks__/              # Mock files cho testing
```

## Cấu trúc src/

```
src/
├── app/                    # Application core
│   ├── routes/             # Route definitions
│   │   ├── app/            # Authenticated routes
│   │   │   ├── discussions/
│   │   │   ├── dashboard.tsx
│   │   │   ├── profile.tsx
│   │   │   └── users.tsx
│   │   ├── auth/           # Authentication routes
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── landing.tsx     # Landing page
│   │   └── not-found.tsx   # 404 page
│   ├── index.tsx           # App entry point
│   ├── provider.tsx        # Providers configuration
│   └── router.tsx          # Router configuration
│
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── drawer/
│   │   ├── dropdown/
│   │   ├── form/
│   │   ├── link/
│   │   ├── md-preview/
│   │   ├── notifications/
│   │   ├── spinner/
│   │   └── table/
│   ├── layouts/            # Layout components
│   │   ├── auth-layout.tsx
│   │   ├── content-layout.tsx
│   │   └── dashboard-layout.tsx
│   ├── errors/             # Error components
│   └── seo/                # SEO components
│
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   ├── comments/          # Comments feature
│   ├── discussions/       # Discussions feature
│   ├── teams/             # Teams feature
│   └── users/             # Users feature
│
├── config/                # Configuration files
│   ├── env.ts             # Environment variables
│   └── paths.ts           # Path configurations
│
├── hooks/                 # Custom React hooks
│   └── use-disclosure.ts
│
├── lib/                   # Library/utility functions
│   ├── api-client.ts      # API client
│   ├── auth.tsx           # Authentication utilities
│   ├── authorization.tsx  # Authorization utilities
│   └── react-query.ts     # React Query configuration
│
├── testing/               # Testing utilities
│   ├── mocks/             # Mock handlers & servers
│   ├── data-generators.ts # Test data generators
│   ├── setup-tests.ts     # Test setup
│   └── test-utils.tsx     # Test utilities
│
├── types/                 # TypeScript types
│   └── api.ts
│
├── utils/                 # Utility functions
│   ├── cn.ts              # Class name utility
│   └── format.ts          # Formatting utilities
│
├── index.css              # Global styles
└── main.tsx               # Entry point
```

## Giải thích chi tiết

### `src/app/` - Application Core

Chứa các cấu hình cốt lõi của ứng dụng:

- **routes/**: Định nghĩa tất cả các route của ứng dụng, được tổ chức theo nhóm (app, auth)
- **provider.tsx**: Cấu hình các provider (React Query, Auth, v.v.)
- **router.tsx**: Cấu hình React Router

### `src/components/` - Reusable Components

Chứa các component có thể tái sử dụng:

- **ui/**: Các component cơ bản như Button, Dialog, Form, Table...
- **layouts/**: Các layout dùng chung (Auth, Dashboard, Content)
- **errors/**: Component hiển thị lỗi
- **seo/**: Component cho SEO (Head)

### `src/features/` - Feature Modules

Mỗi feature được tổ chức thành một module độc lập, bao gồm:

- **api/**: Các hàm gọi API liên quan đến feature
- **components/**: Các component riêng của feature đó

Ví dụ feature `discussions`:

```
features/discussions/
├── api/
│   ├── create-discussion.ts
│   ├── delete-discussion.ts
│   ├── get-discussion.ts
│   ├── get-discussions.ts
│   └── update-discussion.ts
└── components/
    ├── create-discussion.tsx
    ├── delete-discussion.tsx
    ├── discussion-view.tsx
    ├── discussions-list.tsx
    └── update-discussion.tsx
```

### `src/lib/` - Library Functions

Chứa các utility functions và library configuration:

- **api-client.ts**: Cấu hình axios/fetch cho API calls
- **auth.tsx**: Authentication logic
- **authorization.tsx**: Authorization/Permission logic
- **react-query.ts**: React Query client configuration

### `src/testing/` - Testing Utilities

Hỗ trợ việc viết tests:

- **mocks/**: Mock MSW handlers, browser, server
- **data-generators.ts**: Tạo fake data cho tests
- **test-utils.tsx**: Các helper functions cho testing

### `src/config/` - Configuration

- **env.ts**: Đọc và type environment variables
- **paths.ts**: Định nghĩa các đường dẫn tĩnh

## Quy ước đặt tên

- **Components**: PascalCase (vd: `Button.tsx`, `UserList.tsx`)
- **Hooks**: camelCase với prefix `use` (vd: `useUser.ts`)
- **Utilities**: camelCase (vd: `cn.ts`, `format.ts`)
- **API functions**: camelCase (vd: `getUsers.ts`, `createPost.ts`)
- **Files index**: `index.ts` để export các module

## Import Path Aliases

Dự án sử dụng các path aliases sau (được định nghĩa trong `tsconfig.json`):

```json
{
  "@/*": "src/*",
  "@components/*": "src/components/*",
  "@features/*": "src/features/*",
  "@lib/*": "src/lib/*",
  "@hooks/*": "src/hooks/*",
  "@utils/*": "src/utils/*",
  "@config/*": "src/config/*",
  "@testing/*": "src/testing/*"
}
```

## Công nghệ sử dụng

- **Build Tool**: Vite
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query) + Zustand
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Testing**: Vitest + Playwright
- **Storybook**: Component documentation
