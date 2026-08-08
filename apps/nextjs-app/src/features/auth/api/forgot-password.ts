import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api/client';

import { ForgotPasswordInput } from '../schemas/forgot-password.schema';
import { MessageResponse } from '../types/auth.model';

const forgotPassword = (data: ForgotPasswordInput): Promise<MessageResponse> =>
  api.post('/auth/forgot-password', data);

type UseForgotPasswordOptions = { onSuccess?: () => void };

export const useForgotPassword = ({
  onSuccess,
}: UseForgotPasswordOptions = {}) =>
  useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => onSuccess?.(),
  });

export const forgotPasswordFn = forgotPassword;
