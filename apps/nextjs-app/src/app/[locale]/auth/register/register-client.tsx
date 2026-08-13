'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Suspense, useState } from 'react';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { AuthFooterLinks } from '@/features/auth/components/auth-footer-links';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterClient = () => {
  const [success, setSuccess] = useState(false);

  return (
    <AuthShell
      title="Create your account"
      description="Sign up to get started with your team workspace."
    >
      {success ? (
        <div className="flex flex-col items-center gap-6 py-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
            <Icon
              icon="mdi:email-check-outline"
              width="32"
              className="text-emerald-400"
            />
          </div>
          <p className="text-sm leading-relaxed text-ink-400">
            We sent a verification link to your email. Please check your inbox
            and click the link to verify your account before logging in.
          </p>
          <Button asChild className="w-full">
            <Link href={paths.edu.login.getHref()}>Back to sign in</Link>
          </Button>
          <AuthFooterLinks variant="register" />
        </div>
      ) : (
        <Suspense fallback={null}>
          <RegisterForm onSuccess={() => setSuccess(true)} />
        </Suspense>
      )}
    </AuthShell>
  );
};

export default RegisterClient;
