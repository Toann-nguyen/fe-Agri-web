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

// ---------------------------------------------------------------------------
// JWT helpers — pure, edge-safe. Used by BFF /api/auth/session to expose
// expiry without leaking the token, and by auto-refresh to schedule 30-60s
// before exp with jitter.
// ---------------------------------------------------------------------------

/**
 * Decode JWT payload (base64url) without verification. Returns null on failure.
 * Works in edge runtime (atob-less) and handles both real JWT (header.payload.sig)
 * and mock base64 token (plain JSON) used in ms-data tests.
 */
export function decodeJwtPayload<T = Record<string, unknown>>(
  token: string,
): T | null {
  if (!token) return null;
  try {
    // Real JWT has 3 dot-separated parts; mock token is single base64 blob.
    const payloadB64 = token.includes('.')
      ? (token.split('.')[1] ?? '')
      : token;
    if (!payloadB64) return null;
    // base64url -> base64
    const b64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
    const json =
      typeof Buffer !== 'undefined'
        ? Buffer.from(b64 + pad, 'base64').toString('utf-8')
        : atob(b64 + pad);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Extract expiry (seconds since epoch) from a JWT-like token.
 * Returns null if not present or unparsable.
 */
export function getTokenExp(token: string): number | null {
  const payload = decodeJwtPayload<{ exp?: number; expiresAt?: number }>(token);
  if (!payload) return null;
  // `exp` is standard JWT (seconds). Some mocks may use `expiresAt` (ms).
  if (typeof payload.exp === 'number' && payload.exp > 0) return payload.exp;
  if (typeof payload.expiresAt === 'number' && payload.expiresAt > 0) {
    // if it looks like ms, normalize to seconds
    return payload.expiresAt > 1e12
      ? Math.floor(payload.expiresAt / 1000)
      : payload.expiresAt;
  }
  return null;
}

/** Milliseconds until expiry, or null if unknown. Negative means already expired. */
export function getMsUntilExpiry(
  token: string,
  nowMs = Date.now(),
): number | null {
  const expSec = getTokenExp(token);
  if (expSec == null) return null;
  return expSec * 1000 - nowMs;
}

/** True if the token will expire within `thresholdMs` (default 60s). */
export function isExpiringSoon(
  token: string,
  thresholdMs = 60_000,
  nowMs = Date.now(),
): boolean {
  const ms = getMsUntilExpiry(token, nowMs);
  if (ms == null) return false;
  return ms <= thresholdMs;
}

/**
 * Compute ms delay until we should refresh — 30-60s before exp.
 * Uses 45s nominal + +/-15s jitter so callers spread load.
 * Returns 0 if already inside the window, and clamps to >=0.
 * If exp is unknown, returns null (caller should poll / not schedule).
 */
export function getRefreshDelayMs(
  expiresAtMs: number,
  nowMs = Date.now(),
  opts: { minBeforeExpMs?: number; maxBeforeExpMs?: number } = {},
): number | null {
  const minBefore = opts.minBeforeExpMs ?? 30_000;
  const maxBefore = opts.maxBeforeExpMs ?? 60_000;
  if (!Number.isFinite(expiresAtMs)) return null;
  const jitter = minBefore + Math.random() * (maxBefore - minBefore);
  const refreshAt = expiresAtMs - jitter;
  const delay = refreshAt - nowMs;
  return Math.max(0, Math.floor(delay));
}
