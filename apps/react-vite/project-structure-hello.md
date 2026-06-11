.
├── e2e
│   └── tests
│   ├── auth.setup.ts
│   ├── profile.spec.ts
│   └── smoke.spec.ts
├── generators
│   └── component
│   ├── component.stories.tsx.hbs
│   ├── component.tsx.hbs
│   ├── index.cjs
│   └── index.ts.hbs
├── index.html
├── **mocks**
│   ├── vitest-env.d.ts
│   └── zustand.ts
├── mock-server.ts
├── package.json
├── playwright.config.ts
├── plopfile.cjs
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.cjs
├── project-structure-hello.md
├── project-structure.md
├── public
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── mockServiceWorker.js
│   ├── \_redirects
│   └── robots.txt
├── README.md
├── src
│   ├── app
│   │   ├── index.tsx
│   │   ├── provider.tsx
│   │   ├── router.tsx
│   │   └── routes
│   │   ├── app
│   │   │   ├── dashboard.tsx
│   │   │   ├── discussions
│   │   │   │   ├── discussions.tsx
│   │   │   │   ├── discussion.tsx
│   │   │   │   └── **tests**
│   │   │   │   ├── discussions.test.tsx
│   │   │   │   └── discussion.test.tsx
│   │   │   ├── profile.tsx
│   │   │   ├── root.tsx
│   │   │   └── users.tsx
│   │   ├── auth
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── landing.tsx
│   │   └── not-found.tsx
│   ├── assets
│   │   └── logo.svg
│   ├── components
│   │   ├── errors
│   │   │   └── main.tsx
│   │   ├── layouts
│   │   │   ├── auth-layout.tsx
│   │   │   ├── content-layout.tsx
│   │   │   ├── dashboard-layout.tsx
│   │   │   └── index.ts
│   │   ├── seo
│   │   │   ├── head.tsx
│   │   │   ├── index.ts
│   │   │   └── **tests**
│   │   │   └── head.test.tsx
│   │   └── ui
│   │   ├── button
│   │   │   ├── button.stories.tsx
│   │   │   ├── button.tsx
│   │   │   └── index.ts
│   │   ├── dialog
│   │   │   ├── confirmation-dialog
│   │   │   │   ├── confirmation-dialog.stories.tsx
│   │   │   │   ├── confirmation-dialog.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── **tests**
│   │   │   │   └── confirmation-dialog.test.tsx
│   │   │   ├── dialog.stories.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── index.ts
│   │   │   └── **tests**
│   │   │   └── dialog.test.tsx
│   │   ├── drawer
│   │   │   ├── drawer.stories.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── index.ts
│   │   │   └── **tests**
│   │   │   └── drawer.test.tsx
│   │   ├── dropdown
│   │   │   ├── dropdown.stories.tsx
│   │   │   ├── dropdown.tsx
│   │   │   └── index.ts
│   │   ├── form
│   │   │   ├── error.tsx
│   │   │   ├── field-wrapper.tsx
│   │   │   ├── form-drawer.tsx
│   │   │   ├── form.stories.tsx
│   │   │   ├── form.tsx
│   │   │   ├── index.ts
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── **tests**
│   │   │   │   └── form.test.tsx
│   │   │   └── textarea.tsx
│   │   ├── link
│   │   │   ├── index.ts
│   │   │   ├── link.stories.tsx
│   │   │   └── link.tsx
│   │   ├── md-preview
│   │   │   ├── index.ts
│   │   │   ├── md-preview.stories.tsx
│   │   │   └── md-preview.tsx
│   │   ├── notifications
│   │   │   ├── index.ts
│   │   │   ├── notifications-store.ts
│   │   │   ├── notification.stories.tsx
│   │   │   ├── notifications.tsx
│   │   │   ├── notification.tsx
│   │   │   └── **tests**
│   │   │   └── notifications.test.ts
│   │   ├── spinner
│   │   │   ├── index.ts
│   │   │   ├── spinner.stories.tsx
│   │   │   └── spinner.tsx
│   │   └── table
│   │   ├── index.ts
│   │   ├── pagination.tsx
│   │   ├── table.stories.tsx
│   │   └── table.tsx
│   ├── config
│   │   ├── env.ts
│   │   └── paths.ts
│   ├── features
│   │   ├── auth
│   │   │   └── components
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── **tests**
│   │   │   ├── login-form.test.tsx
│   │   │   └── register-form.test.tsx
│   │   ├── comments
│   │   │   ├── api
│   │   │   │   ├── create-comment.ts
│   │   │   │   ├── delete-comment.ts
│   │   │   │   └── get-comments.ts
│   │   │   └── components
│   │   │   ├── comments-list.tsx
│   │   │   ├── comments.tsx
│   │   │   ├── create-comment.tsx
│   │   │   └── delete-comment.tsx
│   │   ├── discussions
│   │   │   ├── api
│   │   │   │   ├── create-discussion.ts
│   │   │   │   ├── delete-discussion.ts
│   │   │   │   ├── get-discussions.ts
│   │   │   │   ├── get-discussion.ts
│   │   │   │   └── update-discussion.ts
│   │   │   └── components
│   │   │   ├── create-discussion.tsx
│   │   │   ├── delete-discussion.tsx
│   │   │   ├── discussions-list.tsx
│   │   │   ├── discussion-view.tsx
│   │   │   └── update-discussion.tsx
│   │   ├── teams
│   │   │   └── api
│   │   │   └── get-teams.ts
│   │   └── users
│   │   ├── api
│   │   │   ├── delete-user.ts
│   │   │   ├── get-users.ts
│   │   │   └── update-profile.ts
│   │   └── components
│   │   ├── delete-user.tsx
│   │   ├── update-profile.tsx
│   │   └── users-list.tsx
│   ├── hooks
│   │   ├── **tests**
│   │   │   └── use-disclosure.test.ts
│   │   └── use-disclosure.ts
│   ├── index.css
│   ├── lib
│   │   ├── api-client.ts
│   │   ├── authorization.tsx
│   │   ├── auth.tsx
│   │   ├── react-query.ts
│   │   └── **tests**
│   │   └── authorization.test.tsx
│   ├── main.tsx
│   ├── testing
│   │   ├── data-generators.ts
│   │   ├── mocks
│   │   │   ├── browser.ts
│   │   │   ├── db.ts
│   │   │   ├── handlers
│   │   │   │   ├── auth.ts
│   │   │   │   ├── comments.ts
│   │   │   │   ├── discussions.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── teams.ts
│   │   │   │   └── users.ts
│   │   │   ├── index.ts
│   │   │   ├── server.ts
│   │   │   └── utils.ts
│   │   ├── setup-tests.ts
│   │   └── test-utils.tsx
│   ├── types
│   │   └── api.ts
│   ├── utils
│   │   ├── cn.ts
│   │   └── format.ts
│   └── vite-env.d.ts
├── tailwind.config.cjs
├── tsconfig.json
├── vite.config.ts
└── vite-env.d.ts

62 directories, 160 files
