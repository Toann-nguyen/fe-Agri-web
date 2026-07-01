import '@testing-library/jest-dom/vitest';

import { initializeDb, resetDb } from '@/testing/mocks/db';
import { server } from '@/testing/mocks/server';

vi.mock('zustand');

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: () => {
        return {
          push: vi.fn(),
          replace: vi.fn(),
        };
      },
      usePathname: () => '/app',
      useSearchParams: () => ({
        get: vi.fn(),
      }),
    };
  });
});
afterAll(() => server.close());
beforeEach(async () => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  window.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
  window.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');

  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  await initializeDb();
});
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
