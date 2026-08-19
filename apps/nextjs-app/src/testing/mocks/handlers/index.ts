import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

import { authHandlers } from './auth';
import { bffHandlers } from './bff';
import { commentsHandlers } from './comments';
import { discussionsHandlers } from './discussions';
import { meHandlers } from './me';
import { teamsHandlers } from './teams';
import { usersHandlers } from './users';

export const handlers = [
  ...authHandlers,
  ...bffHandlers,
  ...meHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...teamsHandlers,
  ...usersHandlers,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
