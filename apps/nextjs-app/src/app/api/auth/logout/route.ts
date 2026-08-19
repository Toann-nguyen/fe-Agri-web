import { NextResponse } from 'next/server';

import { env } from '@/config/env';
import {
  SESSION_COOKIE_NAME,
  buildSessionCookieOptions,
} from '@/lib/auth/session';

/**
 * BFF logout: forward to backend, then clear the HttpOnly session cookie on
 * the 3000 origin.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const cookieHeader = request.headers.get('cookie') ?? '';
  await fetch(`${env.API_URL}/auth/logout`, {
    method: 'POST',
    headers: { Accept: 'application/json', Cookie: cookieHeader },
    cache: 'no-store',
  }).catch(() => undefined);

  const res = NextResponse.json({ message: 'Logged out' });
  res.cookies.set(
    SESSION_COOKIE_NAME,
    '',
    buildSessionCookieOptions({ secure: false, maxAgeSeconds: 0 }),
  );
  return res;
}
