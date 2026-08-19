'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { User } from '@/types/api';

export const userKeys = {
  all: ['user'] as const,
};

/**
 * Fetches the current user from our server route handler `/api/auth/me`,
 * which reads the HttpOnly session cookie and proxies the backend.
 * The client never sees the raw token.
 */
export const getUser = async (): Promise<User | null> => {
  try {
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!res.ok) return null;
    const body = await res.json();
    if (!body.authenticated) return null;
    return body.user as User;
  } catch {
    return null;
  }
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userKeys.all,
    queryFn: getUser,
    staleTime: 1000 * 60, // 1 min
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
