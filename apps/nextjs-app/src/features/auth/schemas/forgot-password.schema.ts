import { z } from 'zod';

export const forgotPasswordInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;
