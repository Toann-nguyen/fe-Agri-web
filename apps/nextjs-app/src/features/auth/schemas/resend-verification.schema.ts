import { z } from 'zod';

export const resendVerificationInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
});

export type ResendVerificationInput = z.infer<
  typeof resendVerificationInputSchema
>;
