import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { configureAuth } from 'react-query-auth';
import { z } from 'zod';

import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { User } from '@/types/api';

import { api } from './api-client';
import { setToken, getToken } from './token-store';

const getUser = async (): Promise<User> => {
  if (!getToken()) {
    return null as unknown as User;
  }
  try {
    const response: any = await api.get('/auth/me');
    const { id, email, profile, roles } = response.data;
    return {
      id: String(id),
      email,
      name: profile?.full_name || email,
      role: roles?.[0] || 'student',
      bio: profile?.bio || '',
      avatar: profile?.avatar,
      createdAt: Date.now(),
    };
  } catch {
    return null as unknown as User;
  }
};

const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } finally {
    setToken(null);
  }
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithEmailAndPassword = async (data: LoginInput): Promise<User> => {
  const response: any = await api.post('/auth/login', data);
  setToken(response.access_token);
  return {
    id: String(response.data.id),
    email: response.data.email,
    name: response.data.profile?.full_name || response.data.email,
    role: response.data.roles?.[0] || 'student',
    bio: '',
    createdAt: Date.now(),
  };
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    name: z.string().min(2, 'Required'),
    password: z.string().min(8, 'At least 8 characters'),
    password_confirmation: z.string().min(1, 'Required'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = async (
  data: RegisterInput,
): Promise<User> => {
  const response: any = await api.post('/auth/register', data);
  useNotifications.getState().addNotification({
    type: 'success',
    title: 'Registration Successful',
    message:
      response.message ||
      'Please check your email to verify your account before logging in.',
  });
  return null as unknown as User;
};

const authConfig = {
  userFn: getUser,
  loginFn: loginWithEmailAndPassword,
  registerFn: registerWithEmailAndPassword,
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.data) {
      router.replace(paths.auth.login.getHref(router.pathname));
    }
  }, [user.data, router]);

  return children;
};
