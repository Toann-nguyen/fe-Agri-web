import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

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
  const pathname = request.nextUrl.pathname;

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

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/image|favicon.ico).*)'],
};
