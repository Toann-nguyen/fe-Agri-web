import Cookies from 'js-cookie';
import { delay } from 'msw';

import { db } from './db';
import { hash } from './hash';

export const encode = (obj: any) => {
  if (typeof window === 'undefined') {
    return Buffer.from(JSON.stringify(obj), 'binary').toString('base64');
  }
  // browser: btoa only handles Latin1 — encode UTF-8 first
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

export const decode = (str: string) => {
  if (typeof window === 'undefined') {
    return JSON.parse(Buffer.from(str, 'base64').toString('binary'));
  }
  // browser: atob returns Latin1 bytes — decode back to UTF-8
  const binary = atob(str);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
};

export { hash };

export const networkDelay = () => {
  const delayTime = process.env.TEST
    ? 200
    : Math.floor(Math.random() * 700) + 300;
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

export const sanitizeUser = <O extends object>(user: O) =>
  omit<O>(user, ['password', 'iat']);

export function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const accessToken = encode(sanitizedUser);
    return {
      access_token: accessToken,
      expires_in: 900,
      token_type: 'Bearer',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile: {
          full_name: user.name,
          bio: user.bio || '',
          avatar: null,
        },
        roles: [user.role],
      },
    };
  }

  const error = new Error('Invalid username or password');
  throw error;
}

export const AUTH_COOKIE = `bulletproof_react_app_token`;

export function requireAuth(
  cookies: Record<string, string>,
  request?: Request,
) {
  try {
    let encodedToken = cookies[AUTH_COOKIE] || Cookies.get(AUTH_COOKIE);

    if (!encodedToken && request) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        encodedToken = authHeader.slice(7);
      }
    }

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
