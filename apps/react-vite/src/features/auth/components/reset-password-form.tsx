import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { resetPasswordInputSchema, useResetPassword } from '@/lib/auth';

import { AuthFooterLinks } from './auth-footer-links';

type ResetPasswordFormProps = {
  token: string;
};

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const resetPassword = useResetPassword({
    onSuccess: () => navigate(paths.auth.login.getHref(), { replace: true }),
  });

  if (!token) {
    return (
      <div className='space-y-4 text-center'>
        <p className='text-sm text-red-400'>Invalid or missing reset token. Please request a new reset link.</p>
        <AuthFooterLinks variant='reset' />
      </div>
    );
  }

  return (
    <div>
      <Form
        onSubmit={(values) => resetPassword.mutate({ token, password: values.password })}
        schema={resetPasswordInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type='password'
              label='New Password'
              error={formState.errors['password']}
              registration={register('password')}
              autoComplete='new-password'
            />
            <Input
              type='password'
              label='Confirm Password'
              error={formState.errors['confirmPassword']}
              registration={register('confirmPassword')}
              autoComplete='new-password'
            />
            <Button
              isLoading={resetPassword.isPending}
              type='submit'
              className='w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20'
            >
              Reset password
            </Button>
          </>
        )}
      </Form>
      <AuthFooterLinks variant='reset' />
    </div>
  );
};
