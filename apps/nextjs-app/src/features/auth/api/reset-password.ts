import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api/client';

import { ResetPasswordInput } from '../schemas/reset-password.schema';
import { MessageResponse } from '../types/auth.model';

const resetPassword = (
  token: string,
  data: Pick<ResetPasswordInput, 'password'>,
): Promise<MessageResponse> =>
  api.post('/auth/reset-password', { token, password: data.password });

type UseResetPasswordOptions = { onSuccess?: () => void };

export const useResetPassword = ({ onSuccess }: UseResetPasswordOptions = {}) =>
  useMutation({
    mutationFn: ({
      token,
      ...data
    }: Pick<ResetPasswordInput, 'password'> & { token: string }) =>
      resetPassword(token, data),
    onSuccess: () => onSuccess?.(),
  });
