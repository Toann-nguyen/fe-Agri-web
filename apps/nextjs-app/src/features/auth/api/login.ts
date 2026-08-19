import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/client';
import { userKeys } from '@/lib/auth/auth-provider';
import { User } from '@/types/api';

import { LoginInput } from '../schemas/login.schema';
import { LoginResponse, toUserModel } from '../types/auth.model';

/**
 * Performs the credential login. The backend sets the HttpOnly session cookie
 * on the response; we do NOT store the token on the client.
 */
export const loginWithEmailAndPassword = (data: LoginInput): Promise<User> =>
  // Hit the same-origin BFF route which sets the HttpOnly session cookie.
  api.post<LoginResponse>('/api/auth/login', data).then((response) => {
    return toUserModel(response);
  });

type UseLoginOptions = {
  onSuccess?: () => void;
} & Record<string, any>;

export const useLogin = ({ onSuccess, ...rest }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (user) => {
      // Invalidate so useUser refetches the server session (cookie).
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      onSuccess?.();
    },
    ...rest,
  });
};
