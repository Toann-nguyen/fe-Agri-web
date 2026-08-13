const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://localhost:3000';

const ROUTES_TO_WARM = [
  '/',
  '/edu/login',
  '/auth/register',
  '/edu/dashboard',
  '/app',
];

async function main() {
  for (const route of ROUTES_TO_WARM) {
    const url = `${BASE_URL}${route}`;
    const startedAt = Date.now();
    try {
      const response = await fetch(url, { redirect: 'manual' });
      console.log(
        `[global-setup] warmed ${route} -> ${response.status} (${Date.now() - startedAt}ms)`,
      );
    } catch (error) {
      console.error(`[global-setup] failed to warm ${route}: ${error}`);
    }
  }
}

export default main;
