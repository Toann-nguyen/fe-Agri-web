import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useRegister, registerInputSchema } from '@/lib/auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const router = useRouter();
  const redirectTo = router.query.redirectTo as string | undefined;

  return (
    <div>
      <Form
        onSubmit={(values) => {
          registering.mutate(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="Full Name"
              error={formState.errors['name']}
              registration={register('name')}
              autoComplete="name"
            />
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
              autoComplete="email"
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
              autoComplete="new-password"
            />
            <Input
              type="password"
              label="Confirm Password"
              error={formState.errors['password_confirmation']}
              registration={register('password_confirmation')}
              autoComplete="new-password"
            />
            <Button
              isLoading={registering.isPending}
              type="submit"
              className="w-full"
            >
              Register
            </Button>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <NextLink
            href={paths.auth.login.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </NextLink>
        </div>
      </div>
    </div>
  );
};
