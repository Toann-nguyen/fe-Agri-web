import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';
import { SESSION_COOKIE_NAME } from '@/lib/auth/session';

import {
  getCurrentSessionToken,
  setCurrentSessionToken,
} from '../session-bridge';

/**
 * Mock the same-origin BFF auth routes used by the browser in tests.
 * They mirror the real Route Handlers: set/clear the session token bridge
 * and proxy to the backend `/auth/*` handlers.
 */
export const bffHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as any;
    const res = await fetch(`${env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok && data.access_token) {
      setCurrentSessionToken(data.access_token);
    }
    return HttpResponse.json(data, { status: res.status });
  }),

  http.post('/api/auth/logout', async () => {
    setCurrentSessionToken(null);
    return HttpResponse.json({ message: 'Logged out' });
  }),

  http.post('/api/auth/refresh', async () => {
    const token = getCurrentSessionToken();
    if (!token) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const res = await fetch(`${env.API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { cookie: `${SESSION_COOKIE_NAME}=${token}` },
    });
    const data = await res.json();
    if (res.ok && data.access_token) {
      setCurrentSessionToken(data.access_token);
    }
    return HttpResponse.json(data, { status: res.status });
  }),
];
