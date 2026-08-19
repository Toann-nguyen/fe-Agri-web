import { NextResponse } from 'next/server';

import { env } from '@/config/env';
import { SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { User } from '@/types/api';

/**
 * Server-side session proxy.
 *
 * The browser sends the HttpOnly session cookie automatically (credentials: include).
 * We forward it to the backend `/auth/me`, so the client never sees the raw token.
 * This is what `useUser` calls instead of hitting the backend directly.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const hasSession = cookieHeader.includes(`${SESSION_COOKIE_NAME}=`);

  if (!hasSession) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const res = await fetch(`${env.API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const response: any = await res.json();
    const { id, email, profile, roles } = response.data ?? {};
    const user: User = {
      id: String(id),
      email,
      name: profile?.full_name || email,
      role: roles?.[0] || 'student',
      bio: profile?.bio || '',
      avatar: profile?.avatar || undefined,
      createdAt: Date.now(),
    };

    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
