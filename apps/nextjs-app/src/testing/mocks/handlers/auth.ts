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
  encode,
  decode,
} from '../utils';

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teamId?: string;
  teamName?: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type ForgotPasswordBody = {
  email: string;
};

type ResetPasswordBody = {
  token: string;
  password: string;
};

type VerifyEmailBody = {
  token: string;
};

type ResendVerificationBody = {
  email: string;
};

const createToken = (payload: Record<string, unknown>) => encode(payload);

const isValidToken = (
  token: string,
  type: 'reset' | 'verify',
): { email: string } | null => {
  try {
    const data = decode(token) as {
      email: string;
      type: string;
      exp: number;
    };
    if (data.type !== type || data.exp < Date.now()) {
      return null;
    }
    return { email: data.email };
  } catch {
    return null;
  }
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

      let teamId;
      let role;

      if (!userObject.teamId) {
        const team = db.team.create({
          name: userObject.teamName ?? `${userObject.firstName} Team`,
        });
        await persistDb('team');
        teamId = team.id;
        role = 'ADMIN';
      } else {
        const existingTeam = db.team.findFirst({
          where: {
            id: {
              equals: userObject.teamId,
            },
          },
        });

        if (!existingTeam) {
          return HttpResponse.json(
            {
              message: 'The team you are trying to join does not exist!',
            },
            { status: 400 },
          );
        }
        teamId = userObject.teamId;
        role = 'USER';
      }

      db.user.create({
        ...userObject,
        role,
        password: hash(userObject.password),
        teamId,
      });

      await persistDb('user');

      const result = authenticate({
        email: userObject.email,
        password: userObject.password,
      });

      // todo: remove once tests in Github Actions are fixed
      Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

      return HttpResponse.json(result, {
        headers: {
          // with a real API servier, the token cookie should also be Secure and HttpOnly
          'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
        },
      });
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

      // todo: remove once tests in Github Actions are fixed
      Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

      return HttpResponse.json(result, {
        headers: {
          // with a real API servier, the token cookie should also be Secure and HttpOnly
          'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
        },
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/logout`, async () => {
    await networkDelay();

    // todo: remove once tests in Github Actions are fixed
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

  http.get(`${env.API_URL}/auth/me`, async ({ cookies }) => {
    await networkDelay();

    try {
      const { user } = requireAuth(cookies);
      return HttpResponse.json({ data: user });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/forgot-password`, async ({ request }) => {
    await networkDelay();

    try {
      const { email } = (await request.json()) as ForgotPasswordBody;
      const user = db.user.findFirst({
        where: { email: { equals: email } },
      });

      if (user) {
        createToken({
          email,
          type: 'reset',
          exp: Date.now() + 3600000,
        });
      }

      return HttpResponse.json({
        message: 'If an account exists, a reset link has been sent.',
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/reset-password`, async ({ request }) => {
    await networkDelay();

    try {
      const { token, password } = (await request.json()) as ResetPasswordBody;
      const tokenData = isValidToken(token, 'reset');

      if (!tokenData) {
        return HttpResponse.json(
          { message: 'Invalid or expired reset token' },
          { status: 400 },
        );
      }

      const user = db.user.findFirst({
        where: { email: { equals: tokenData.email } },
      });

      if (!user) {
        return HttpResponse.json(
          { message: 'Invalid or expired reset token' },
          { status: 400 },
        );
      }

      db.user.update({
        where: { id: { equals: user.id } },
        data: { password: hash(password) },
      });
      await persistDb('user');

      return HttpResponse.json({ message: 'Password reset successfully' });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/verify-email`, async ({ request }) => {
    await networkDelay();

    try {
      const { token } = (await request.json()) as VerifyEmailBody;
      const tokenData = isValidToken(token, 'verify');

      if (!tokenData) {
        return HttpResponse.json(
          { message: 'Invalid or expired verification token' },
          { status: 400 },
        );
      }

      return HttpResponse.json({ message: 'Email verified successfully' });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/resend-verification`, async ({ request }) => {
    await networkDelay();

    try {
      const { email } = (await request.json()) as ResendVerificationBody;
      const user = db.user.findFirst({
        where: { email: { equals: email } },
      });

      if (user) {
        createToken({
          email,
          type: 'verify',
          exp: Date.now() + 86400000,
        });
      }

      return HttpResponse.json({
        message: 'If an account exists, a verification email has been sent.',
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
