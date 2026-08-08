'use client';

import { Spinner } from '@/components/ui/spinner';
import { useUser } from '@/lib/auth/auth-provider';
import { canViewUsers } from '@/lib/auth/authorization';

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  if (!user?.data) {
    return <Spinner className="m-4" />;
  }

  if (!canViewUsers(user?.data)) {
    return <div>Only admin can view this.</div>;
  }

  return children;
};
