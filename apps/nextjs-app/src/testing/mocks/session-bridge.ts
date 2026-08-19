/**
 * Test-only bridge between `loginAsUser` (which sets the HttpOnly-equivalent
 * session cookie in jsdom) and the `/api/auth/me` MSW handler.
 *
 * In the browser, the cookie is sent automatically. In jsdom + node fetch
 * (vitest), node fetch does NOT forward `document.cookie`, so we surface the
 * current test session token here for the handler to read.
 */
let currentSessionToken: string | null = null;

export const setCurrentSessionToken = (token: string | null) => {
  currentSessionToken = token;
};

export const getCurrentSessionToken = () => currentSessionToken;
