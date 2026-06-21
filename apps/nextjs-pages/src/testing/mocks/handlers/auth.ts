import Cookies from 'js-cookie';
import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import {
  authenticate,
  hash,
  requireAuth,
  AUTH_COOKIE,
  networkDelay,
} from '../utils';

type RegisterBody = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  http.post(`${env.API_URL}/auth/register`, async ({ request }) => {
    await networkDelay();
    try {
      const userObject = (await request.json()) as RegisterBody;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        return HttpResponse.json(
          { message: 'The user already exists' },
          { status: 400 },
        );
      }

      const user = db.user.create({
        name: userObject.name,
        email: userObject.email,
        password: hash(userObject.password),
        role: 'student',
        teamId: '',
        bio: '',
      });

      await persistDb('user');

      return HttpResponse.json(
        {
          message:
            'Registration successful. Please check your email for verification.',
          data: {
            id: user.id,
            email: user.email,
            status: 'UNVERIFIED',
          },
        },
        { status: 201 },
      );
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/login`, async ({ request }) => {
    await networkDelay();

    try {
      const credentials = (await request.json()) as LoginBody;
      const result = authenticate(credentials);

      Cookies.set(AUTH_COOKIE, result.access_token, { path: '/' });

      return HttpResponse.json(result, {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=${result.access_token}; Path=/;`,
        },
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 401 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/logout`, async () => {
    await networkDelay();

    Cookies.remove(AUTH_COOKIE);

    return HttpResponse.json(
      { message: 'Logged out' },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=; Path=/;`,
        },
      },
    );
  }),

  http.get(`${env.API_URL}/auth/me`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies, request);
      if (error || !user) {
        return HttpResponse.json(
          { message: 'Token not provided' },
          { status: 401 },
        );
      }

      return HttpResponse.json({
        data: {
          id: user.id,
          email: user.email,
          profile: {
            full_name: user.name,
            bio: user.bio || '',
            avatar: null,
          },
          roles: [user.role],
          permissions: [],
        },
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
