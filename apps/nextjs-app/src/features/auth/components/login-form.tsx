'use client';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useLogin, loginInputSchema } from '@/lib/auth';

import { AuthFooterLinks } from './auth-footer-links';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({ onSuccess });
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => login.mutate(values)}
        schema={loginInputSchema}
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
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
              autoComplete="current-password"
            />
            <Button
              isLoading={login.isPending}
              type="submit"
              className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Sign in
            </Button>
          </>
        )}
      </Form>
      <AuthFooterLinks variant="login" redirectTo={redirectTo} />
    </div>
  );
};
