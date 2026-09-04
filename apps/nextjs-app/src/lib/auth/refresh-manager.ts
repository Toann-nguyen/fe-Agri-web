/**
 * Single-flight refresh manager.
 *
 * Guarantees at most one in-flight `POST /api/auth/refresh` at any moment.
 * Concurrent callers share the same Promise (single-flight lock) and get
 * the same resolution. Uses the BFF so the HttpOnly cookie is auto-sent and
 * the raw token never touches JS.
 */

let inFlight: Promise<boolean> | null = null;

async function doRefresh(): Promise<boolean> {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Refresh failed');
  return true;
}

/**
 * Trigger a refresh with single-flight dedup. Resolves true on success,
 * throws on failure (and clears the lock so a retry can run).
 */
export function refreshSession(): Promise<boolean> {
  if (inFlight) return inFlight;
  inFlight = doRefresh()
    .then((ok) => ok)
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

/** For tests — inspect/clear the in-flight promise. */
export function __resetRefreshForTests() {
  inFlight = null;
}
export function __getInFlight() {
  return inFlight;
}
