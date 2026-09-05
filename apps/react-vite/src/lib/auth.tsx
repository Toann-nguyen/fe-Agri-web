import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { paths } from '@/config/paths';
import { User } from '@/types/api';

import { api } from './api-client';
import { getAccessToken, login as oidcLogin, logout as oidcLogout, userManager } from './oidc';

// Keep validation schemas for fallback forms (captcha etc.)
export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
  captcha_token: z.string().optional(),
});
export type LoginInput = z.infer<typeof loginInputSchema>;

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

// Legacy direct API calls kept for forgot/reset/verify (not auth session)
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

// User fetching via Bearer token (memory)
const fetchUser = async (): Promise<User> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated');
  const response = await api.get('/auth/me');
  return (response as unknown as { data: User })?.data ?? (response as unknown as User);
};

export const useUser = () =>
  useQuery<User, Error>({
    queryKey: ['auth', 'user'],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

// PKCE login triggers OIDC redirect instead of direct POST (no react-query-auth)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLogin = (_opts: { onSuccess?: () => void } = {}) => {
  const loc = useLocation();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_data: LoginInput) => {
      const redirectTo = new URLSearchParams(loc.search).get('redirectTo') ?? '/app';
      await oidcLogin(redirectTo);
      return null as unknown as User;
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useRegister = (_opts: { onSuccess?: () => void } = {}) =>
  useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_data: RegisterInput) => {
      await oidcLogin('/app');
      return null as unknown as User;
    },
  });

export const useLogout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await oidcLogout();
    },
    onSuccess: () => {
      qc.clear();
    },
  });
};

// AuthLoader — replaces react-query-auth AuthLoader
export const AuthLoader = ({
  children,
  renderLoading,
}: {
  children: React.ReactNode;
  renderLoading?: () => React.ReactNode;
}) => {
  const [isReady, setIsReady] = React.useState(false);
  const qc = useQueryClient();

  React.useEffect(() => {
    let mounted = true;
    userManager
      .getUser()
      .then(async (user) => {
        if (user && !user.expired) {
          try {
            await qc.prefetchQuery({ queryKey: ['auth', 'user'], queryFn: fetchUser });
          } catch {
            // no-op
          }
        } else if (user?.expired) {
          try {
            await userManager.signinSilent();
            await qc.prefetchQuery({ queryKey: ['auth', 'user'], queryFn: fetchUser });
          } catch {
            // silent renew failed
          }
        }
      })
      .finally(() => {
        if (mounted) setIsReady(true);
      });

    const onUserLoaded = () => {
      qc.invalidateQueries({ queryKey: ['auth', 'user'] });
    };
    const onUserUnloaded = () => {
      qc.setQueryData(['auth', 'user'], null);
    };
    userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addUserUnloaded(onUserUnloaded);
    return () => {
      mounted = false;
      userManager.events.removeUserLoaded(onUserLoaded);
      userManager.events.removeUserUnloaded(onUserUnloaded);
    };
  }, [qc]);

  if (!isReady) return <>{renderLoading?.() ?? null}</>;

  return <>{children}</>;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useUser();
  const location = useLocation();

  if (isLoading) return null;
  if (isError || !user) {
    return <Navigate to={paths.auth.login.getHref(location.pathname)} replace />;
  }
  return <>{children}</>;
};

export { oidcLogin as login, oidcLogout as logout, getAccessToken };
