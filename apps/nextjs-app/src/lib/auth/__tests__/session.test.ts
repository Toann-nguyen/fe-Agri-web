import { describe, expect, it } from 'vitest';

import {
  SESSION_COOKIE_NAME,
  buildSessionCookieOptions,
  isSessionCookieSet,
  parseSessionCookieHeader,
} from '../session';

describe('auth/session (cookie-based, HttpOnly)', () => {
  it('uses a stable HttpOnly session cookie name', () => {
    expect(SESSION_COOKIE_NAME).toBe('educonnect_session');
  });

  it('parses a session JWT out of a Cookie header value', () => {
    const header = 'educonnect_session=eyJhbGciOi; other=value';
    expect(parseSessionCookieHeader(header)).toBe('eyJhbGciOi');
  });

  it('returns null when the session cookie is absent from the header', () => {
    expect(parseSessionCookieHeader('foo=bar; baz=qux')).toBeNull();
    expect(parseSessionCookieHeader('')).toBeNull();
    expect(parseSessionCookieHeader(undefined)).toBeNull();
  });

  it('builds secure HttpOnly SameSite=Lax cookie options', () => {
    const opts = buildSessionCookieOptions({ maxAgeSeconds: 3600 });
    expect(opts.httpOnly).toBe(true);
    expect(opts.secure).toBe(true);
    expect(opts.sameSite).toBe('lax');
    expect(opts.path).toBe('/');
    expect(opts.maxAge).toBe(3600);
  });

  it('detects whether the session cookie is present in a request cookie map', () => {
    expect(isSessionCookieSet({ educonnect_session: 'x' })).toBe(true);
    expect(isSessionCookieSet({ other: 'x' })).toBe(false);
    expect(isSessionCookieSet({})).toBe(false);
  });
});
