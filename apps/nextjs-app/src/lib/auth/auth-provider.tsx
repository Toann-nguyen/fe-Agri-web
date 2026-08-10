'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { User } from '@/types/api';

import { api } from '../api/client';

import { getToken } from './token-store';

export const userKeys = {
  all: ['user'] as const,
};

export const getUser = async (): Promise<User> => {
  if (!getToken()) {
    return null as unknown as User;
  }
  try {
    const response: any = await api.get('/auth/me');
    const { id, email, profile, roles } = response.data;
    return {
      id: String(id),
      email,
      name: profile?.full_name || email,
      role: roles?.[0] || 'student',
      bio: profile?.bio || '',
      avatar: profile?.avatar || undefined,
      createdAt: Date.now(),
    };
  } catch {
    return null as unknown as User;
  }
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userKeys.all,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.data && !user.isLoading && !user.isFetching) {
      router.replace('/edu/login');
    }
  }, [user.data, user.isLoading, user.isFetching, router]);

  if (user.isLoading || user.isFetching) return null;
  if (!user.data) return null;

  return <>{children}</>;
};
