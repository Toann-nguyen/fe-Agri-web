'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/paths';
import {
  resendVerificationInputSchema,
  useResendVerification,
  useVerifyEmail,
} from '@/lib/auth';

import { AuthFooterLinks } from './auth-footer-links';

type VerifyEmailStatusProps = {
  token?: string | null;
};

export const VerifyEmailStatus = ({ token }: VerifyEmailStatusProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >(token ? 'loading' : 'idle');
  const verifyEmail = useVerifyEmail({
    onSuccess: () => setStatus('success'),
  });
  const resendVerification = useResendVerification();

  useEffect(() => {
    if (token) {
      verifyEmail.mutate(
        { token },
        {
          onError: () => setStatus('error'),
        },
      );
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === 'loading' || verifyEmail.isPending) {
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <Spinner size="lg" />
        <p className="text-sm text-ink-400">Verifying your email...</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-ink-400">
          Your email has been verified successfully.
        </p>
        <Button
          className="w-full"
          onClick={() => router.replace(paths.auth.login.getHref())}
        >
          Continue to sign in
        </Button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-4">
        <p className="text-center text-sm text-red-400">
          This verification link is invalid or has expired.
        </p>
        <Form
          onSubmit={(values) => resendVerification.mutate(values)}
          schema={resendVerificationInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Input
                type="email"
                label="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
                autoComplete="email"
                autoFocus
              />
              <Button
                isLoading={resendVerification.isPending}
                type="submit"
                className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Resend verification email
              </Button>
            </>
          )}
        </Form>
        {resendVerification.isSuccess && (
          <p className="text-center text-sm text-cyan-400">
            Verification email sent. Please check your inbox.
          </p>
        )}
        <AuthFooterLinks variant="verify" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-ink-400">
        Enter your email to resend the verification link.
      </p>
      <Form
        onSubmit={(values) => resendVerification.mutate(values)}
        schema={resendVerificationInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
              autoComplete="email"
              autoFocus
            />
            <Button
              isLoading={resendVerification.isPending}
              type="submit"
              className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Resend verification email
            </Button>
          </>
        )}
      </Form>
      {resendVerification.isSuccess && (
        <p className="text-center text-sm text-cyan-400">
          Verification email sent. Please check your inbox.
        </p>
      )}
      <AuthFooterLinks variant="verify" />
    </div>
  );
};
