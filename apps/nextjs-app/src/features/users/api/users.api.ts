import { api } from '@/lib/api/client';

import { DeleteUserDto, UpdateUserDto, UserDto } from '../types/user.dto';

export const getUsers = (): Promise<{ data: UserDto[] }> => {
  return api.get(`/users`);
};

export const deleteUser = ({ userId }: DeleteUserDto) => {
  return api.delete(`/users/${userId}`);
};

export const updateUserProfile = ({ data }: { data: UpdateUserDto }) => {
  return api.patch(`/users/profile`, data);
};
