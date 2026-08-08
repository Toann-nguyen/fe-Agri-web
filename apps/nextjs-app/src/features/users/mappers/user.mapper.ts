import { User } from '@/types/api';

import { UserDto } from '../types/user.dto';

export const toUserModel = (dto: UserDto): User => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  role: dto.role,
  bio: dto.bio,
  avatar: dto.avatar,
  createdAt: dto.createdAt,
});

export const toUserModelList = (dtos: UserDto[]): User[] =>
  dtos.map(toUserModel);
