/**
 * Server-side session helpers for cookie-based auth.
 *
 * Best-practice (Next.js App Router, https://nextjs.org/docs/app/building-your-application/authentication):
 * - The access token lives ONLY in an HttpOnly cookie set by the backend.
 * - The frontend NEVER reads the token from JS (no localStorage, no document.cookie access).
 * - The browser sends the cookie automatically via `credentials: 'include'`.
 *
 * These helpers are pure (no `next/headers` import) so they stay unit-testable.
 * The actual `cookies()` read/write lives in Route Handlers and Middleware.
 */

export const SESSION_COOKIE_NAME = 'educonnect_session';

/** Parse the value of the session cookie out of a `Cookie:` header string. */
export function parseSessionCookieHeader(
  header: string | undefined | null,
): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === SESSION_COOKIE_NAME) {
      return rest.join('=') || null;
    }
  }
  return null;
}

/** True when a request cookie map (name -> value) contains the session cookie. */
export function isSessionCookieSet(
  cookies: Record<string, string | undefined>,
): boolean {
  return Boolean(cookies[SESSION_COOKIE_NAME]);
}

export type SessionCookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  path: string;
  maxAge?: number;
};

/**
 * Recommended cookie options for the session cookie.
 * Mirrors Next.js' documented secure defaults. `secure` is forced on unless
 * explicitly disabled (e.g. local HTTP dev) to avoid shipping insecure cookies.
 */
export function buildSessionCookieOptions({
  maxAgeSeconds,
  secure = true,
}: {
  maxAgeSeconds?: number;
  secure?: boolean;
}): SessionCookieOptions {
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    ...(maxAgeSeconds != null ? { maxAge: maxAgeSeconds } : {}),
  };
}
