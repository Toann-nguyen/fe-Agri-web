import { z } from 'zod';

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
  captcha_token: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
