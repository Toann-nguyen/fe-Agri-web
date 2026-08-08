import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api/client';

import { ResendVerificationInput } from '../schemas/resend-verification.schema';
import { MessageResponse } from '../types/auth.model';

const resendVerification = (
  data: ResendVerificationInput,
): Promise<MessageResponse> => api.post('/auth/resend-verification', data);

type UseResendVerificationOptions = { onSuccess?: () => void };

export const useResendVerification = ({
  onSuccess,
}: UseResendVerificationOptions = {}) =>
  useMutation({
    mutationFn: resendVerification,
    onSuccess: () => onSuccess?.(),
  });
