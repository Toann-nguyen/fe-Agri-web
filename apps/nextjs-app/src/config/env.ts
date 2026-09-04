import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    ENABLE_API_MOCKING: z
      .string()
      .refine((s) => s === 'true' || s === 'false')
      .transform((s) => s === 'true')
      .optional(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
    APP_MOCK_API_PORT: z.string().optional().default('8080'),
    // Server-only: internal backend URL for Route Handlers (BFF).
    // NEVER expose via NEXT_PUBLIC_* — route handlers run server-side only.
    INTERNAL_API_URL: z.string().optional(),
  });

  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    ENABLE_API_MOCKING: process.env.NEXT_PUBLIC_ENABLE_API_MOCKING,
    APP_URL: process.env.NEXT_PUBLIC_URL,
    APP_MOCK_API_PORT: process.env.NEXT_PUBLIC_MOCK_API_PORT,
    INTERNAL_API_URL: process.env.API_URL_INTERNAL,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

/**
 * Backend base URL for server-side Route Handlers (BFF).
 * Prefers API_URL_INTERNAL (never sent to the browser); falls back to the
 * public API_URL for local dev where both are the same origin backend.
 */
export const serverApiUrl = (): string => env.INTERNAL_API_URL ?? env.API_URL;

export const env = createEnv();
