import { afterEach, describe, expect, it, vi } from 'vitest';

import { api } from '../client';

describe('api client (cookie-based auth)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('sends requests with credentials: include and NO Authorization header', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api');
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    vi.stubGlobal('fetch', fetchMock);

    await api.get('/things');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain('/things');
    expect(init.credentials).toBe('include');
    expect(init.headers.Authorization).toBeUndefined();
  });

  it('does not attach an Authorization header even when a token is present in storage', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api');
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    vi.stubGlobal('fetch', fetchMock);

    await api.get('/things');

    const init = fetchMock.mock.calls[0][1];
    expect(init.headers.Authorization).toBeUndefined();
  });

  it('refreshes via POST /auth/refresh with credentials: include (cookie), not a body token', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api');
    let callCount = 0;
    const fetchMock = vi.fn().mockImplementation(async (url: string) => {
      callCount += 1;
      if (String(url).includes('/auth/refresh')) {
        return new Response(JSON.stringify({ access_token: 'new' }), {
          status: 200,
        });
      }
      // original request 401 first time, ok second time (after refresh)
      if (callCount === 1) {
        return new Response(JSON.stringify({ message: 'unauthorized' }), {
          status: 401,
        });
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const res = await api.get('/protected');
    expect(res).toEqual({ ok: true });

    const refreshCall = fetchMock.mock.calls.find((c) =>
      String(c[0]).includes('/api/auth/refresh'),
    );
    expect(refreshCall).toBeDefined();
    if (!refreshCall) throw new Error('refresh call missing');
    expect(refreshCall[1].credentials).toBe('include');
    expect(
      (refreshCall[1].headers as Record<string, string>).Authorization,
    ).toBeUndefined();
  });
});
