import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '@/lib/api/client';
import { User } from '@/types/api';

import { RegisterInput } from '../schemas/register.schema';
import { MessageResponse } from '../types/auth.model';

const registerWithEmailAndPassword = async (
  data: RegisterInput,
): Promise<User> => {
  const response = await api.post<MessageResponse>('/auth/register', data);
  toast.success(
    response.message ||
      'Registration successful. Please check your email to verify your account before logging in.',
  );
  return null as unknown as User;
};

type UseRegisterOptions = { onSuccess?: () => void };

export const useRegister = ({ onSuccess }: UseRegisterOptions = {}) => {
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
