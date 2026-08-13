'use client';

import { Icon } from '@iconify/react';
import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, registration, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <FieldWrapper label={label} error={error}>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              'pr-10',
              className,
            )}
            ref={ref}
            {...registration}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon
              icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}
              width="18"
            />
          </button>
        </div>
      </FieldWrapper>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
