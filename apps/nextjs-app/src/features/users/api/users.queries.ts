import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { MutationConfig, QueryConfig } from '@/lib/api/query-client';
import { useUser } from '@/lib/auth/auth-provider';
import { User } from '@/types/api';

import { userKeys } from '../constants';
import { toUserModelList } from '../mappers/user.mapper';
import { UpdateProfileInput } from '../schemas/update-profile.schema';
import { DeleteUserDto } from '../types/user.dto';

import { deleteUser, getUsers, updateUserProfile } from './users.api';

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: userKeys.all,
    queryFn: async () => {
      const { data } = await getUsers();
      return { data: toUserModelList(data) };
    },
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};

type UseDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({
  mutationConfig,
}: UseDeleteUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteUser,
  });
};

type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateUserProfile>;
};

export const useUpdateProfile = ({
  mutationConfig,
}: UseUpdateProfileOptions = {}) => {
  const { refetch: refetchUser } = useUser();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      refetchUser();
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateUserProfile,
  });
};

export type { DeleteUserDto, User, UpdateProfileInput };
