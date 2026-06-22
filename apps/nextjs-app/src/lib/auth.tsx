'use client';

import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { User } from '@/types/api';

import { api } from './api-client';
import { setToken, getToken } from './token-store';

export const getUser = async (): Promise<User> => {
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
      avatar: profile?.avatar || undefined,
      createdAt: Date.now(),
    };
  } catch {
    return null as unknown as User;
  }
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.data && !user.isLoading && !user.isFetching) {
      router.replace('/auth/login');
    }
  }, [user.data, user.isLoading, user.isFetching, router]);

  if (user.isLoading || user.isFetching) return null;
  if (!user.data) return null;

  return <>{children}</>;
};

export const useLogin = ({
  onSuccess,
  ...rest
}: { onSuccess?: () => void } & Record<string, any>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (user) => {
      queryClient.setQueryData(userQueryKey, user);
      onSuccess?.();
    },
    ...rest,
  });
};

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
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
  captcha_token: z.string().optional(),
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
  toast.success(
    response.message ||
      'Registration successful. Please check your email to verify your account before logging in.',
  );
  return null as unknown as User;
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

export type ResendVerificationInput = z.infer<
  typeof resendVerificationInputSchema
>;

type MessageResponse = { message: string };

const forgotPassword = (data: ForgotPasswordInput): Promise<MessageResponse> =>
  api.post('/auth/forgot-password', data);

const resetPassword = (
  token: string,
  data: Pick<ResetPasswordInput, 'password'>,
): Promise<MessageResponse> =>
  api.post('/auth/reset-password', { token, password: data.password });

const verifyEmail = (token: string): Promise<MessageResponse> =>
  api.post('/auth/verify-email', { token });

const resendVerification = (
  data: ResendVerificationInput,
): Promise<MessageResponse> => api.post('/auth/resend-verification', data);

export const useForgotPassword = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => onSuccess?.(),
  });

export const useResetPassword = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: ({
      token,
      ...data
    }: Pick<ResetPasswordInput, 'password'> & { token: string }) =>
      resetPassword(token, data),
    onSuccess: () => onSuccess?.(),
  });

export const useVerifyEmail = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: ({ token }: { token: string }) => verifyEmail(token),
    onSuccess: () => onSuccess?.(),
  });

export const useResendVerification = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) =>
  useMutation({
    mutationFn: resendVerification,
    onSuccess: () => onSuccess?.(),
  });
