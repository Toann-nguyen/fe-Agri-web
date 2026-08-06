FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy workspace manifests so pnpm can resolve the monorepo lockfile.
# The lockfile + workspace config live at the repo root, so the build
# context must be the repo root (see docker-compose.yml).
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/nextjs-app/package.json ./apps/nextjs-app/package.json
COPY apps/nextjs-pages/package.json ./apps/nextjs-pages/package.json
COPY apps/react-vite/package.json ./apps/react-vite/package.json

RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
RUN corepack enable
# Bring the full workspace install (root node_modules + per-package
# node_modules symlinks) from the deps stage. The build context's own
# node_modules are excluded via .dockerignore, so copying /app here is what
# makes `next` (and other bin shims) resolvable inside each package.
COPY --from=deps /app /app
COPY . .

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* are inlined at build time. Defaults in next.config.mjs already
# point to production; override here only if you need a different target.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_ENABLE_API_MOCKING=false
ARG NEXT_PUBLIC_MOCK_API_PORT=8080
ARG NEXT_PUBLIC_EMAIL_ADDRESS
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_ENABLE_API_MOCKING=$NEXT_PUBLIC_ENABLE_API_MOCKING
ENV NEXT_PUBLIC_MOCK_API_PORT=$NEXT_PUBLIC_MOCK_API_PORT
ENV NEXT_PUBLIC_EMAIL_ADDRESS=$NEXT_PUBLIC_EMAIL_ADDRESS

RUN pnpm --filter fe-agri-nextjs-app run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# `next build` (output: 'standalone') emits a self-contained server under
# .next/standalone (with its own traced node_modules). The app lives under
# apps/nextjs-app, so server.js is at apps/nextjs-app/server.js relative to
# the standalone root copied to /app.
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs-app/.next/static ./apps/nextjs-app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs-app/public ./apps/nextjs-app/public

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by `next build` from the standalone output
CMD ["node", "apps/nextjs-app/server.js"]
