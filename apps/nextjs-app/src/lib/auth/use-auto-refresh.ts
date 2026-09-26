'use client';

import { useEffect, useRef } from 'react';

import { refreshSession } from '@/lib/auth/refresh-manager';
import { getRefreshDelayMs } from '@/lib/auth/session';

type SessionInfo = { authenticated: boolean; expiresAt?: number };

async function fetchSession(): Promise<SessionInfo | null> {
  try {
    const res = await fetch('/api/auth/session', {
      credentials: 'include',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as SessionInfo;
  } catch {
    return null;
  }
}

/**
 * Auto-refresh hook — schedules a refresh 30-60s before `expiresAt`.
 * - Fetches /api/auth/session to learn expiresAt.
 * - Sets a single timer at delay = expiresAt - jitter(30..60s) - now.
 * - On timer fire, does single-flight refresh, then re-fetches & reschedules.
 * - Re-syncs on window focus / visibilitychange / online.
 * - No token is ever read from JS; only expiry millis are used.
 */
export function useSessionAutoRefresh(enabled = true) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (!enabled || typeof window === 'undefined') return;

    let cancelled = false;

    const clear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const schedule = async () => {
      if (cancelled || !mountedRef.current) return;
      clear();
      const info = await fetchSession();
      if (cancelled || !info?.authenticated || !info.expiresAt) return;
      const delay = getRefreshDelayMs(info.expiresAt, Date.now());
      if (delay == null) return;
      // If we're beyond the window (delay 0), refresh immediately.
      timerRef.current = setTimeout(async () => {
        try {
          await refreshSession();
        } catch {
          // Refresh failed — let 401 handling redirect; stop scheduling.
          return;
        }
        if (!cancelled && mountedRef.current) schedule();
      }, delay);
    };

    schedule();

    const onRevalidate = () => {
      // Debounce tab wakeups slightly — if we just refreshed, schedule() will
      // compute the new delay correctly.
      clear();
      // small debounce so burst focus events coalesce
      setTimeout(() => {
        if (!cancelled) schedule();
      }, 250);
    };

    window.addEventListener('focus', onRevalidate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') onRevalidate();
    });
    window.addEventListener('online', onRevalidate);

    return () => {
      cancelled = true;
      mountedRef.current = false;
      clear();
      window.removeEventListener('focus', onRevalidate);
      document.removeEventListener('visibilitychange', onRevalidate as never);
      window.removeEventListener('online', onRevalidate);
    };
  }, [enabled]);
}
