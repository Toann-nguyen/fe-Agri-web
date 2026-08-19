import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/client';
import { userKeys } from '@/lib/auth/auth-provider';

const logout = async (): Promise<void> => {
  // Same-origin BFF route clears the HttpOnly session cookie.
  await api.post('/api/auth/logout');
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
