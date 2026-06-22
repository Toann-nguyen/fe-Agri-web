/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteTsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      include: ['src/**'],
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'],
    // Pre-bundle heavy dependencies for faster cold starts
    include: ['react', 'react-dom', 'react-router', '@tanstack/react-query'],
  },
  build: {
    // Enable minification for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Generate source maps for debugging
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'esnext',
    rollupOptions: {
      external: ['fs/promises'],
      output: {
        experimentalMinChunkSize: 3500,
        // Manual chunk splitting for better code splitting and caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'class-variance-authority'],
          query: ['@tanstack/react-query', '@tanstack/react-query-devtools'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
  // CSS optimization
  css: {
    devSourcemap: false,
  },
});
