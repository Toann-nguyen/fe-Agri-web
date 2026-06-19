import { configureAuth } from 'react-query-auth';
import { useMutation } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved
import { paths } from '@/config/paths';
// eslint-disable-next-line import/no-unresolved
import { AuthResponse, User } from '@/types/api';

import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(5, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        }),
      ),
  );

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (data: RegisterInput): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

export const forgotPasswordInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;

export const resetPasswordInputSchema = z
  .object({
    password: z.string().min(5, 'Required'),
    confirmPassword: z.string().min(5, 'Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;

export const resendVerificationInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
});

export type ResendVerificationInput = z.infer<typeof resendVerificationInputSchema>;

type MessageResponse = { message: string };

const forgotPassword = (data: ForgotPasswordInput): Promise<MessageResponse> => api.post('/auth/forgot-password', data);

const resetPassword = (token: string, data: Pick<ResetPasswordInput, 'password'>): Promise<MessageResponse> =>
  api.post('/auth/reset-password', { token, password: data.password });

const verifyEmail = (token: string): Promise<MessageResponse> => api.post('/auth/verify-email', { token });

const resendVerification = (data: ResendVerificationInput): Promise<MessageResponse> =>
  api.post('/auth/resend-verification', data);

export const useForgotPassword = ({ onSuccess }: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => onSuccess?.(),
  });

export const useResetPassword = ({ onSuccess }: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: ({ token, ...data }: Pick<ResetPasswordInput, 'password'> & { token: string }) =>
      resetPassword(token, data),
    onSuccess: () => onSuccess?.(),
  });

export const useVerifyEmail = ({ onSuccess }: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: ({ token }: { token: string }) => verifyEmail(token),
    onSuccess: () => onSuccess?.(),
  });

export const useResendVerification = ({ onSuccess }: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: resendVerification,
    onSuccess: () => onSuccess?.(),
  });

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return <Navigate to={paths.auth.login.getHref(location.pathname)} replace />;
  }

  return children;
};
