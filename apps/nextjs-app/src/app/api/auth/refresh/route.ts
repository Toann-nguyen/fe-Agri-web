import { NextResponse } from 'next/server';

import { env } from '@/config/env';
import {
  SESSION_COOKIE_NAME,
  buildSessionCookieOptions,
} from '@/lib/auth/session';

/**
 * BFF refresh: the browser sends the HttpOnly session cookie automatically.
 * We forward it to the backend, which returns a new token; we re-set the
 * HttpOnly cookie on the 3000 origin.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const cookieHeader = request.headers.get('cookie') ?? '';

  const backendRes = await fetch(`${env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { Accept: 'application/json', Cookie: cookieHeader },
    cache: 'no-store',
  });

  const data = await backendRes.json().catch(() => ({}));

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message || 'Refresh failed' },
      { status: backendRes.status },
    );
  }

  const token: string | undefined = data.access_token;
  const res = NextResponse.json(data);
  if (token) {
    res.cookies.set(
      SESSION_COOKIE_NAME,
      token,
      buildSessionCookieOptions({ secure: false }),
    );
  }
  return res;
}
