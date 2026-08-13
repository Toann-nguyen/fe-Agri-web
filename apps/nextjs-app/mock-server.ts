import { createMiddleware } from '@mswjs/http-middleware';
import cors from 'cors';
import express from 'express';
import { readFile, writeFile } from 'node:fs/promises';
import logger from 'pino-http';

import './load-env';
import { initializeDb, setPersistence } from './src/testing/mocks/db';
import { handlers } from './src/testing/mocks/handlers';

const dbFilePath = 'mocked-db.json';

// This file only runs in Node (dev/e2e via tsx+pm2), never in the browser or
// Cloudflare bundle, so importing fs/promises here is safe.
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
    origin: process.env.NEXT_PUBLIC_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(
  logger({
    level: 'info',
    redact: ['req.headers', 'res.headers'],
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: true,
      },
    },
  }),
);
app.use(createMiddleware(...handlers));

initializeDb().then(() => {
  console.log('Mock DB initialized');
  app.listen(process.env.NEXT_PUBLIC_MOCK_API_PORT, () => {
    console.log(
      `Mock API server started at http://localhost:${process.env.NEXT_PUBLIC_MOCK_API_PORT}`,
    );
  });
});
