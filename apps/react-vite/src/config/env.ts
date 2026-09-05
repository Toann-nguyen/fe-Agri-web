import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    ENABLE_API_MOCKING: z
      .string()
      .transform((s) => {
        if (s === 'true') return true;
        if (s === 'false') return false;
        return false;
      })
      .optional()
      .default('false'),
    APP_URL: z.string().optional().default('http://localhost:3000'),
    APP_MOCK_API_PORT: z.string().optional().default('8080'),
    // OIDC PKCE (T4.1)
    OIDC_AUTHORITY: z.string().optional().default('http://localhost:8080'),
    OIDC_CLIENT_ID: z.string().optional().default('agri-vite-client'),
    OIDC_REDIRECT_URI: z.string().optional().default('http://localhost:3000/auth/callback'),
    OIDC_POST_LOGOUT_REDIRECT_URI: z.string().optional().default('http://localhost:3000/'),
    OIDC_SCOPE: z.string().optional().default('openid profile email offline_access'),
    OIDC_SILENT_REDIRECT_URI: z.string().optional().default('http://localhost:3000/silent-renew.html'),
  });

  const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  }, {});

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

  return parsedEnv.data;
};

export const env = createEnv();
