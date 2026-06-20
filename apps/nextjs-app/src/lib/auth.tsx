import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';

import { AuthResponse, User } from '@/types/api';

import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

export const getUser = async (): Promise<User> => {
  const response = await api.get<{ data: User }>('/auth/me');
  return response.data;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

export const useLogin = ({
  onSuccess,
  ...rest
}: { onSuccess?: () => void } & Record<string, any>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
    ...rest,
  });
};

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
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

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
  captcha_token: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
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

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
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
