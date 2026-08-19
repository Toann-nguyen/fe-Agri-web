import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { SESSION_COOKIE_NAME } from './lib/auth/session';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

function applySecurityHeaders(response: NextResponse, pathname: string) {
  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload',
  );
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  );

  // Cache-Control
  if (
    pathname.startsWith('/_next/static') ||
    pathname.match(/\.(woff2|css|js)$/)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  } else if (pathname.match(/\.(png|jpg|jpeg|webp|ico|svg)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=86400, stale-while-revalidate=604800',
    );
  } else {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }
}

const PROTECTED_PREFIX = '/edu/';
const LOGIN_PATH = '/edu/login';

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  return Boolean(cookie?.value);
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Route guard: any /edu/* page except the login page requires a session.
  if (
    pathname.startsWith(PROTECTED_PREFIX) &&
    !pathname.startsWith(LOGIN_PATH)
  ) {
    if (!isAuthenticated(request)) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = intlMiddleware(request);
  applySecurityHeaders(response, request.nextUrl.pathname);
  return response;
}

export const config = {
  // Match all pathnames except API routes, Next internals and static assets.
  // This also covers unprefixed default-locale pathnames required by `as-needed`.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|ico|svg|js)$).*)',
  ],
};
