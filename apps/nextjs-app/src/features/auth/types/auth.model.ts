import { User } from '@/types/api';

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  data: {
    id: string;
    email: string;
    profile: {
      full_name: string | null;
      phone_number: string | null;
      avatar: string | null;
      bio?: string;
    };
    roles: string[];
  };
};

export type MessageResponse = { message: string };

export const toUserModel = (loggedUser: any): User => ({
  id: String(loggedUser?.data?.id ?? loggedUser.id),
  email: loggedUser?.data?.email ?? loggedUser?.email,
  name:
    loggedUser?.data?.profile?.full_name ||
    loggedUser.name ||
    loggedUser?.data?.email,
  role: loggedUser?.data?.roles?.[0] ?? loggedUser.role ?? 'student',
  bio: loggedUser?.data?.profile?.bio ?? loggedUser.bio ?? '',
  createdAt: Date.now(),
});
