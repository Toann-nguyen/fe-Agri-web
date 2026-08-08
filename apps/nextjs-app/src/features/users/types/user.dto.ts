import { BaseEntity } from '@/types/api';

import { Role } from './roles.enum';

export type UserDto = BaseEntity & {
  name: string;
  email: string;
  role: Role;
  bio: string;
  avatar?: string;
};

export type UpdateUserDto = {
  email: string;
  name: string;
  bio: string;
};

export type DeleteUserDto = {
  userId: string;
};
