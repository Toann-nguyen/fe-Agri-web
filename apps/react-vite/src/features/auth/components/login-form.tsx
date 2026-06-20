import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useLogin, loginInputSchema } from '@/lib/auth';

import { AuthFooterLinks } from './auth-footer-links';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const login = useLogin({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => {
          login.mutate(values, {
            onError: (error: any) => {
              try {
                const body = JSON.parse(error.message);
                if (body.requires_captcha) setRequiresCaptcha(true);
                if (body.attempts_left != null) setAttemptsLeft(body.attempts_left);
              } catch {
                setRequiresCaptcha(false);
              }
            },
          });
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type='email'
              label='Email Address'
              error={formState.errors['email']}
              registration={register('email')}
              autoComplete='email'
            />
            <Input
              type='password'
              label='Password'
              error={formState.errors['password']}
              registration={register('password')}
              autoComplete='current-password'
            />
            {requiresCaptcha && (
              <Input
                type='text'
                label='Captcha Token'
                error={formState.errors['captcha_token']}
                registration={register('captcha_token')}
              />
            )}
            {attemptsLeft != null && (
              <p className='text-sm text-amber-600'>
                Invalid credentials. {attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining.
              </p>
            )}
            <Button
              isLoading={login.isPending}
              type='submit'
              className='w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20'
            >
              Sign in
            </Button>
          </>
        )}
      </Form>
      <AuthFooterLinks variant='login' redirectTo={redirectTo} />
    </div>
  );
};
