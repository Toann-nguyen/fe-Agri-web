import * as React from 'react';
import { useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useRegister, registerInputSchema } from '@/lib/auth';

import { AuthFooterLinks } from './auth-footer-links';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => registering.mutate(values)}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type='text'
              label='Full Name'
              error={formState.errors['name']}
              registration={register('name')}
              autoComplete='name'
            />
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
              autoComplete='new-password'
            />
            <Input
              type='password'
              label='Confirm Password'
              error={formState.errors['password_confirmation']}
              registration={register('password_confirmation')}
              autoComplete='new-password'
            />
            <Button
              isLoading={registering.isPending}
              type='submit'
              className='w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20'
            >
              Sign up
            </Button>
          </>
        )}
      </Form>
      <AuthFooterLinks variant='register' redirectTo={redirectTo} />
    </div>
  );
};
