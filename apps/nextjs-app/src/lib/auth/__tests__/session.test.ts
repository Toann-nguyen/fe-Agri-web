import { describe, expect, it } from 'vitest';

import {
  SESSION_COOKIE_NAME,
  buildSessionCookieOptions,
  decodeJwtPayload,
  getMsUntilExpiry,
  getRefreshDelayMs,
  getTokenExp,
  isExpiringSoon,
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

  it('decodes a JWT payload and extracts exp', () => {
    const payload = { sub: '123', exp: 9999999999 };
    const b64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const token = `header.${b64}.sig`;
    expect(decodeJwtPayload(token)).toMatchObject({ exp: 9999999999 });
    expect(getTokenExp(token)).toBe(9999999999);
  });

  it('handles mock base64 token with exp', () => {
    const payload = { id: '1', exp: 9999999999 };
    const token = Buffer.from(JSON.stringify(payload)).toString('base64');
    expect(getTokenExp(token)).toBe(9999999999);
  });

  it('computes ms until expiry and isExpiringSoon', () => {
    const now = Date.now();
    const expSec = Math.floor((now + 20_000) / 1000);
    const b64 = Buffer.from(JSON.stringify({ exp: expSec })).toString('base64');
    expect(getMsUntilExpiry(b64, now)).toBeGreaterThan(15_000);
    expect(isExpiringSoon(b64, 60_000, now)).toBe(true);
    expect(isExpiringSoon(b64, 5_000, now)).toBe(false);
  });

  it('getRefreshDelayMs schedules 30-60s before exp with jitter', () => {
    const now = Date.now();
    const expiresAt = now + 10 * 60_000; // 10 min
    const delay = getRefreshDelayMs(expiresAt, now);
    expect(delay).not.toBeNull();
    // must be ~9 min (=10min - 30..60s)
    expect(delay!).toBeGreaterThan(8 * 60_000);
    expect(delay!).toBeLessThan(10 * 60_000);
  });

  it('getRefreshDelayMs returns 0 when already inside window', () => {
    const now = Date.now();
    const expiresAt = now + 10_000; // 10s left
    const delay = getRefreshDelayMs(expiresAt, now);
    expect(delay).toBe(0);
  });

  it('returns null for non-numeric expiry', () => {
    expect(getTokenExp('not-a-token')).toBeNull();
    expect(getMsUntilExpiry('not-a-token')).toBeNull();
  });
});
