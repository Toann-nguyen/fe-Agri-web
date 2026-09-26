import * as React from 'react';
import { useNavigate } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { handleCallback } from '@/lib/oidc';

const CallbackRoute = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    handleCallback()
      .then((user) => {
        const redirectTo = (user?.state as string) || '/app';
        navigate(redirectTo, { replace: true });
      })
      .catch((err) => {
        setError(err?.message ?? 'Authentication failed');
      });
  }, [navigate]);

  if (error) {
    return (
      <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
        <p className='text-sm text-red-600'>{error}</p>
        <a href='/auth/login' className='text-sm underline'>
          Back to login
        </a>
      </div>
    );
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Spinner size='xl' />
    </div>
  );
};

export default CallbackRoute;
