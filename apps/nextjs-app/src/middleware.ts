import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';
import { SESSION_COOKIE_NAME } from './lib/auth/session';

const intlMiddleware = createMiddleware(routing);

function applySecurityHeaders(response: NextResponse, pathname: string) {
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

// Locale-aware helpers — routing.localePrefix = 'as-needed' means default locale (vi)
// has no prefix, only `en` is prefixed as `/en/...`.
const LOCALES = routing.locales as readonly string[];
const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l !== routing.defaultLocale);

function stripLocalePrefix(pathname: string): string {
  for (const loc of NON_DEFAULT_LOCALES) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      return pathname.slice(loc.length + 1) || '/';
    }
  }
  return pathname;
}

function getLocalePrefix(pathname: string): string {
  for (const loc of NON_DEFAULT_LOCALES) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))
      return `/${loc}`;
  }
  return '';
}

const LOGIN_SUFFIX = '/edu/login';

function isProtectedPath(normalizedPath: string): boolean {
  // /app and /app/* are fully protected
  if (normalizedPath === '/app' || normalizedPath.startsWith('/app/'))
    return true;
  // /edu/* except /edu/login (and /edu/login/*) is protected
  if (
    normalizedPath.startsWith('/edu/') &&
    !normalizedPath.startsWith(LOGIN_SUFFIX)
  )
    return true;
  return false;
}

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  return Boolean(cookie?.value);
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const normalized = stripLocalePrefix(pathname);

  if (isProtectedPath(normalized) && !isAuthenticated(request)) {
    const prefix = getLocalePrefix(pathname);
    const loginPath = `${prefix}${LOGIN_SUFFIX}`;
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = intlMiddleware(request);
  applySecurityHeaders(response, request.nextUrl.pathname);
  return response;
}

export const config = {
  // Match all pathnames except API routes, Next internals and static assets.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|ico|svg|js)$).*)',
  ],
};
