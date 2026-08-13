// Side-effect module: load .env before any config that reads env vars.
// tsx/ts-node/pm2/vite-node do not auto-load .env, so load it explicitly.
// Only runs in Node (mock server via tsx+pm2), never in the browser bundle.
try {
  process.loadEnvFile('.env');
} catch (error: any) {
  if (error?.code !== 'ENOENT') {
    console.error('Failed to load .env for mock server:', error);
  }
}
