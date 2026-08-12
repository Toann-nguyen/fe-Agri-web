'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/paths';
import { useVerifyEmail } from '@/features/auth/api/verify-email';
import { AuthFooterLinks } from '@/features/auth/components/auth-footer-links';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { getErrorMessage } from '@/lib/api/error';

export const VerifyEmailClient = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(
    token ? 'verifying' : 'error',
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const verifyEmail = useVerifyEmail({
    onSuccess: () => setStatus('success'),
  });

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    setStatus('verifying');
    verifyEmail.mutate(
      { token },
      {
        onError: (error) => {
          setErrorMessage(getErrorMessage(error));
          setStatus('error');
        },
      },
    );
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthShell
      title="Verify your email"
      description="Confirm your email address to activate your account."
    >
      {status === 'verifying' && (
        <div className="flex flex-col items-center gap-4 py-4">
          <Spinner size="lg" />
          <p className="text-sm text-ink-400">Verifying your email...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center gap-6 py-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
            <Icon
              icon="mdi:email-check-outline"
              width="32"
              className="text-emerald-400"
            />
          </div>
          <p className="text-sm leading-relaxed text-ink-400">
            Your email has been verified successfully!
          </p>
          <Button asChild className="w-full">
            <Link href={paths.auth.login.getHref()}>Sign in</Link>
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-6 py-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <Icon
              icon="mdi:email-off-outline"
              width="32"
              className="text-red-400"
            />
          </div>
          <p className="text-sm leading-relaxed text-ink-400">
            {errorMessage || 'Invalid verification link'}
          </p>
          {token ? (
            <Button asChild className="w-full">
              <Link href={paths.auth.login.getHref()}>Back to sign in</Link>
            </Button>
          ) : (
            <AuthFooterLinks variant="verify" />
          )}
        </div>
      )}
    </AuthShell>
  );
};

export default VerifyEmailClient;
