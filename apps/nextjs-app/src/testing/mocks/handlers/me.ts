import { HttpResponse, http } from 'msw';

import { decode } from '../utils';
import { getCurrentSessionToken } from '../session-bridge';

/**
 * Frontend-only session proxy. In tests, `loginAsUser` sets the session token
 * via the test bridge (jsdom + node fetch does not forward `document.cookie`).
 * The token is a base64-encoded sanitized user, mirroring the real backend's
 * `/auth/me` payload, so we decode it directly.
 */
export const meHandlers = [
  http.get('/api/auth/me', async () => {
    const token = getCurrentSessionToken();
    if (!token) {
      return HttpResponse.json({ authenticated: false }, { status: 401 });
    }
    try {
      const user = decode(token);
      return HttpResponse.json({ authenticated: true, user });
    } catch {
      return HttpResponse.json({ authenticated: false }, { status: 401 });
    }
  }),
];
