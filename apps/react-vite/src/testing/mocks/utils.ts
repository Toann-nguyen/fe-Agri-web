import { delay } from 'msw';

import { db } from './db';

export const encode = (obj: any) => {
  const btoa =
    typeof window === 'undefined' ? (str: string) => Buffer.from(str, 'binary').toString('base64') : window.btoa;
  return btoa(JSON.stringify(obj));
};

export const decode = (str: string) => {
  const atob =
    typeof window === 'undefined' ? (str: string) => Buffer.from(str, 'base64').toString('binary') : window.atob;
  return JSON.parse(atob(str));
};

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

export const networkDelay = () => {
  const delayTime = import.meta.env.TEST ? 200 : Math.floor(Math.random() * 700) + 300;
  return delay(delayTime);
};

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T;
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const sanitizeUser = <O extends object>(user: O) => omit<O>(user, ['password', 'iat']);

export function authenticate({ email, password }: { email: string; password: string }) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = encode(sanitizedUser);
    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error('Invalid username or password');
  throw error;
}

// Kept for transition — MSW now prefers Authorization: Bearer, fallback to cookie for legacy
export const AUTH_COOKIE = `bulletproof_react_app_token`;

// In-memory token for tests (replaces js-cookie localStorage)
let memoryToken: string | null = null;
export const setMemoryToken = (t: string | null) => {
  memoryToken = t;
  if (typeof window !== 'undefined' && t) {
    try {
      window.sessionStorage.setItem('__test_token', t);
    } catch {
      /* no-op */
    }
  }
};
export const getMemoryToken = () => {
  if (memoryToken) return memoryToken;
  if (typeof window !== 'undefined') {
    try {
      return window.sessionStorage.getItem('__test_token');
    } catch {
      return null;
    }
  }
  return null;
};
export const clearMemoryToken = () => {
  memoryToken = null;
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem('__test_token');
    } catch {
      /* no-op */
    }
  }
};

export function requireAuth(cookies: Record<string, string>, headers?: Record<string, string> | Headers) {
  try {
    // Prefer Authorization: Bearer <token> (PKCE)
    let encodedToken: string | null = null;
    if (headers) {
      const h =
        headers instanceof Headers
          ? headers.get('authorization') || headers.get('Authorization')
          : (headers as Record<string, string>)['authorization'] ||
            (headers as Record<string, string>)['Authorization'];
      if (h?.startsWith('Bearer ')) encodedToken = h.slice(7);
    }
    // Fallback to memory token / cookie for tests
    if (!encodedToken) encodedToken = getMemoryToken();
    if (!encodedToken) encodedToken = cookies[AUTH_COOKIE] || null;
    if (!encodedToken) {
      return { error: 'Unauthorized', user: null };
    }
    const decodedToken = decode(encodedToken) as { id: string };

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      return { error: 'Unauthorized', user: null };
    }

    return { user: sanitizeUser(user) };
  } catch (err: any) {
    return { error: 'Unauthorized', user: null };
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}
