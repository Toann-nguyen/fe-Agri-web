import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/client';
import { userKeys } from '@/lib/auth/auth-provider';
import { setToken } from '@/lib/auth/token-store';
import { User } from '@/types/api';

import { LoginInput } from '../schemas/login.schema';
import { LoginResponse, toUserModel } from '../types/auth.model';

const loginWithEmailAndPassword = (data: LoginInput): Promise<User> =>
  api.post<LoginResponse>('/auth/login', data).then((response) => {
    setToken(response.access_token);
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
      queryClient.setQueryData(userKeys.all, user);
      onSuccess?.();
    },
    ...rest,
  });
};
