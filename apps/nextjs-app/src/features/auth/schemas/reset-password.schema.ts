import { z } from 'zod';

export const resetPasswordInputSchema = z
  .object({
    password: z.string().min(5, 'Required'),
    confirmPassword: z.string().min(5, 'Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
