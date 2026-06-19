'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Form, Input, Select, Label, Switch } from '@/components/ui/form';
import { useRegister, registerInputSchema } from '@/lib/auth';
import { Team } from '@/types/api';

import { AuthFooterLinks } from './auth-footer-links';

type RegisterFormProps = {
  onSuccess: () => void;
  chooseTeam: boolean;
  setChooseTeam: () => void;
  teams?: Team[];
};

export const RegisterForm = ({
  onSuccess,
  chooseTeam,
  setChooseTeam,
  teams,
}: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

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
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
              autoComplete="given-name"
              autoFocus
            />
            <Input
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
              autoComplete="family-name"
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

            <div className="flex items-center space-x-2">
              <Switch
                checked={chooseTeam}
                onCheckedChange={setChooseTeam}
                className={`${
                  chooseTeam ? 'bg-cyan-600' : 'bg-slate-600'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
                id="choose-team"
              />
              <Label htmlFor="choose-team">Join Existing Team</Label>
            </div>

            {chooseTeam && teams ? (
              <Select
                label="Team"
                error={formState.errors['teamId']}
                registration={register('teamId')}
                options={teams?.map((team) => ({
                  label: team.name,
                  value: team.id,
                }))}
              />
            ) : (
              <Input
                type="text"
                label="Team Name"
                error={formState.errors['teamName']}
                registration={register('teamName')}
                autoComplete="organization"
              />
            )}
            <Button
              isLoading={registering.isPending}
              type="submit"
              className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Sign up
            </Button>
          </>
        )}
      </Form>
      <AuthFooterLinks variant="register" redirectTo={redirectTo} />
    </div>
  );
};
