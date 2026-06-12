/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  plugins: [react(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    env: {
      NEXT_PUBLIC_API_URL:
        process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api',
      NEXT_PUBLIC_ENABLE_API_MOCKING:
        process.env.NEXT_PUBLIC_ENABLE_API_MOCKING ?? 'false',
    },
    coverage: {
      include: ['src/**'],
    },
  },
});
