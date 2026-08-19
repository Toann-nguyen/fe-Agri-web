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
  it('redirects unauthenticated users away from /edu/app to /edu/login', async () => {
    const res = (await middleware(makeReq('/edu/app'))) as NextResponse;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/edu/login');
  });

  it('allows authenticated users into /edu/app (no redirect)', async () => {
    const res = (await middleware(
      makeReq('/edu/app', 'valid-jwt'),
    )) as NextResponse;
    expect(res.status).not.toBe(307);
    expect(res.headers.get('location')).toBeNull();
  });

  it('does not guard public routes like /edu/login', async () => {
    const res = (await middleware(makeReq('/edu/login'))) as NextResponse;
    expect(res.headers.get('location')).toBeNull();
  });
});
