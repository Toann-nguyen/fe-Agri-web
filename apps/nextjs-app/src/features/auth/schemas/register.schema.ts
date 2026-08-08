import { z } from 'zod';

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    name: z.string().min(2, 'Required'),
    password: z.string().min(8, 'At least 8 characters'),
    password_confirmation: z.string().min(1, 'Required'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;
