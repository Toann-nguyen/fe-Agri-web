import { readFile, writeFile } from 'node:fs/promises';

import { createMiddleware } from '@mswjs/http-middleware';
import cors from 'cors';
import express from 'express';
import logger from 'pino-http';

import { env } from './src/config/env';
import { initializeDb, setPersistence } from './src/testing/mocks/db';
import { handlers } from './src/testing/mocks/handlers';

const dbFilePath = 'mocked-db.json';

// This file only runs in Node (dev/e2e via vite-node+pm2), never in the
// browser bundle, so importing fs/promises here is safe.
setPersistence({
  load: async () => {
    try {
      return JSON.parse(await readFile(dbFilePath, 'utf8'));
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        await writeFile(dbFilePath, JSON.stringify({}, null, 2));
        return {};
      }
      console.error('Error loading mocked DB:', error);
      return null;
    }
  },
  store: (data) => writeFile(dbFilePath, data),
});

const app = express();

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(logger());
app.use(createMiddleware(...handlers));

initializeDb().then(() => {
  console.log('Mock DB initialized');
  app.listen(env.APP_MOCK_API_PORT, () => {
    console.log(`Mock API server started at http://localhost:${env.APP_MOCK_API_PORT}`);
  });
});
