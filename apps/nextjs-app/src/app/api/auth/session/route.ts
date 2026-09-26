import { NextResponse } from 'next/server';

export const runtime = 'edge';

import { getTokenExp } from '@/lib/auth/session';

/**
 * BFF session introspection — does NOT forward to backend.
 * Reads the HttpOnly session cookie, decodes its `exp` (JWT or mock), and
 * returns the absolute expiry the client should use to schedule a refresh
 * 30-60s before exp. Never leaks the token itself.
 *
 * GET /api/auth/session → { authenticated, expiresAt?, expiresIn?, exp? }
 */
export async function GET(request: Request): Promise<NextResponse> {
  const cookieHeader = request.headers.get('cookie') ?? '';
  // Extract session token from Cookie header (NextRequest cookie parsing
  // is unavailable on `Request`; parse manually).
  const match = cookieHeader
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith('educonnect_session='));
  const token = match ? match.slice('educonnect_session='.length) : '';

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const expSec = getTokenExp(token);
  const nowSec = Math.floor(Date.now() / 1000);

  // If token has no exp (legacy mock), synthesize 15min window so auto-refresh
  // still has a target; real JWTs always have exp so this branch is test-only.
  const exp = expSec ?? nowSec + 900;
  const expiresAt = exp * 1000;
  const expiresIn = Math.max(0, exp - nowSec);

  return NextResponse.json({
    authenticated: true,
    expiresAt,
    expiresIn,
    exp,
  });
}
