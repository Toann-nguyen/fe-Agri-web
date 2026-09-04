import { NextRequest, NextResponse } from 'next/server';
import { describe, expect, it } from 'vitest';

import { SESSION_COOKIE_NAME } from '@/lib/auth/session';

import middleware from '../middleware';

function makeReq(path: string, cookieValue?: string): NextRequest {
  const url = `http://localhost${path}`;
  const headers = new Headers();
  if (cookieValue) {
    headers.set('Cookie', `${SESSION_COOKIE_NAME}=${cookieValue}`);
  }
  return new NextRequest(url, { headers });
}

describe('middleware route guard (cookie-based)', () => {
  it('redirects unauthenticated users away from /edu/dashboard to /edu/login', async () => {
    const res = (await middleware(makeReq('/edu/dashboard'))) as NextResponse;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/edu/login');
  });

  it('allows authenticated users into /edu/dashboard (no redirect)', async () => {
    const res = (await middleware(
      makeReq('/edu/dashboard', 'valid-jwt'),
    )) as NextResponse;
    expect(res.status).not.toBe(307);
    expect(res.headers.get('location')).toBeNull();
  });

  it('does not guard public routes like /edu/login', async () => {
    const res = (await middleware(makeReq('/edu/login'))) as NextResponse;
    expect(res.headers.get('location')).toBeNull();
  });

  it('redirects unauthenticated users away from /app to /edu/login', async () => {
    const res = (await middleware(makeReq('/app'))) as NextResponse;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/edu/login');
    expect(res.headers.get('location')).toContain('redirectTo=%2Fapp');
  });

  it('redirects unauthenticated users away from /app/discussions', async () => {
    const res = (await middleware(makeReq('/app/discussions'))) as NextResponse;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/edu/login');
  });

  it('allows authenticated users into /app', async () => {
    const res = (await middleware(
      makeReq('/app', 'valid-jwt'),
    )) as NextResponse;
    expect(res.headers.get('location')).toBeNull();
  });

  it('handles en locale prefix: /en/edu/dashboard redirects to /en/edu/login', async () => {
    const res = (await middleware(
      makeReq('/en/edu/dashboard'),
    )) as NextResponse;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/en/edu/login');
  });

  it('handles en locale prefix: authenticated user can enter /en/app', async () => {
    const res = (await middleware(
      makeReq('/en/app', 'valid-jwt'),
    )) as NextResponse;
    expect(res.headers.get('location')).toBeNull();
  });

  it('does not guard public /en/edu/login', async () => {
    const res = (await middleware(makeReq('/en/edu/login'))) as NextResponse;
    expect(res.headers.get('location')).toBeNull();
  });

  it('does not guard root or public landing', async () => {
    const res = (await middleware(makeReq('/'))) as NextResponse;
    expect(res.headers.get('location')).toBeNull();
  });
});
