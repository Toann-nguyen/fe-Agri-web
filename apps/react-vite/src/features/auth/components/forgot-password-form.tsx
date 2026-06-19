import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { forgotPasswordInputSchema, useForgotPassword } from '@/lib/auth';

import { AuthFooterLinks } from './auth-footer-links';

export const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const forgotPassword = useForgotPassword({
    onSuccess: () => setSubmitted(true),
  });

  if (submitted) {
    return (
      <div className='space-y-4 text-center'>
        <p className='text-sm text-ink-400'>
          If an account exists for that email, we&apos;ve sent password reset instructions.
        </p>
        <AuthFooterLinks variant='forgot' />
      </div>
    );
  }

  return (
    <div>
      <Form onSubmit={(values) => forgotPassword.mutate(values)} schema={forgotPasswordInputSchema}>
        {({ register, formState }) => (
          <>
            <Input
              type='email'
              label='Email Address'
              error={formState.errors['email']}
              registration={register('email')}
              autoComplete='email'
            />
            <Button
              isLoading={forgotPassword.isPending}
              type='submit'
              className='w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20'
            >
              Send reset link
            </Button>
          </>
        )}
      </Form>
      <AuthFooterLinks variant='forgot' />
    </div>
  );
};
