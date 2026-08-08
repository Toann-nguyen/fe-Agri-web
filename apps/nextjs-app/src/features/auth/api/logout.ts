import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/client';
import { userKeys } from '@/lib/auth/auth-provider';
import { setToken } from '@/lib/auth/token-store';

const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } finally {
    setToken(null);
  }
};

type UseLogoutOptions = { onSuccess?: () => void };

export const useLogout = ({ onSuccess }: UseLogoutOptions = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userKeys.all });
      onSuccess?.();
    },
  });
};
