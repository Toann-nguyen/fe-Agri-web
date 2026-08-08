import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api/client';

import { MessageResponse } from '../types/auth.model';

const verifyEmail = (token: string): Promise<MessageResponse> =>
  api.post('/auth/verify-email', { token });

type UseVerifyEmailOptions = { onSuccess?: () => void };

export const useVerifyEmail = ({ onSuccess }: UseVerifyEmailOptions = {}) =>
  useMutation({
    mutationFn: ({ token }: { token: string }) => verifyEmail(token),
    onSuccess: () => onSuccess?.(),
  });
