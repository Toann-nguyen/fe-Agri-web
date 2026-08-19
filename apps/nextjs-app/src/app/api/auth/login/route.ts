import { NextResponse } from 'next/server';

import { env } from '@/config/env';
import {
  SESSION_COOKIE_NAME,
  buildSessionCookieOptions,
} from '@/lib/auth/session';
import { LoginInput } from '@/features/auth/schemas/login.schema';

/**
 * BFF login endpoint (same-origin). The browser POSTs credentials here; we
 * forward to the backend and, on success, set the HttpOnly session cookie on
 * the 3000 origin (so the browser attaches it to every same-origin request).
 * The raw token never reaches client JS.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: LoginInput;
  try {
    body = (await request.json()) as LoginInput;
  } catch {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 });
  }

  const backendRes = await fetch(`${env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = await backendRes.json().catch(() => ({}));

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message || 'Unauthorized' },
      { status: backendRes.status },
    );
  }

  const token: string | undefined = data.access_token;
  if (!token) {
    return NextResponse.json(
      { message: 'No session token returned' },
      { status: 502 },
    );
  }

  const res = NextResponse.json(data);
  res.cookies.set(
    SESSION_COOKIE_NAME,
    token,
    buildSessionCookieOptions({ secure: false }),
  );
  return res;
}
