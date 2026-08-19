import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SESSION_COOKIE_NAME } from '@/lib/auth/session';

import { GET } from '../route';

function makeRequest(cookieValue?: string): Request {
  const headers = new Headers();
  if (cookieValue) {
    headers.set('Cookie', `${SESSION_COOKIE_NAME}=${cookieValue}`);
  }
  return new Request('http://localhost/api/auth/me', { headers });
}

describe('GET /api/auth/me (server session proxy)', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns 401 when the session cookie is missing', async () => {
    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ authenticated: false });
  });

  it('proxies the backend /auth/me response when a session cookie is present', async () => {
    const backendUser = {
      id: '1',
      email: 'a@b.com',
      profile: { full_name: 'A B', bio: '', avatar: null },
      roles: ['student'],
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: backendUser }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const res = await GET(makeRequest('jwt-token'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.authenticated).toBe(true);
    expect(body.user.email).toBe('a@b.com');
    expect(body.user.role).toBe('student');

    // Must forward the session cookie to the backend (credentials: include).
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain('/auth/me');
    expect((init.headers as Record<string, string>).Cookie).toBe(
      `${SESSION_COOKIE_NAME}=jwt-token`,
    );
  });

  it('returns 401 when the backend rejects the session', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('Unauthorized', { status: 401 })),
    );
    const res = await GET(makeRequest('expired'));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.authenticated).toBe(false);
  });
});
