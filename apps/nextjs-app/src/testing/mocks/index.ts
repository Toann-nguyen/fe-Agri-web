import { env } from '@/config/env';

let mockingPromise: Promise<unknown> | null = null;

export const enableMocking = async () => {
  if (!env.ENABLE_API_MOCKING) return;

  if (mockingPromise) return mockingPromise;

  mockingPromise = (async () => {
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    await initializeDb();
    return worker.start();
  })();

  return mockingPromise;
};
