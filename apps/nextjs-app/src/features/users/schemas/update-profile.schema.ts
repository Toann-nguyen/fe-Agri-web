import { z } from 'zod';

export const updateProfileInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  name: z.string().min(1, 'Required'),
  bio: z.string(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
