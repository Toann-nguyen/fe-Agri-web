import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

const models = {
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    teamId: String,
    role: String,
    bio: String,
    createdAt: Date.now,
  },
  team: {
    id: primaryKey(nanoid),
    name: String,
    description: String,
    createdAt: Date.now,
  },
  discussion: {
    id: primaryKey(nanoid),
    title: String,
    body: String,
    authorId: String,
    teamId: String,
    createdAt: Date.now,
  },
  comment: {
    id: primaryKey(nanoid),
    body: String,
    authorId: String,
    discussionId: String,
    createdAt: Date.now,
  },
};

export const db = factory(models);

export type Model = keyof typeof models;

type Persistence = {
  load: () => Promise<Record<string, unknown> | null>;
  store: (data: string) => Promise<void>;
};

let persistence: Persistence | null = null;

// Injected by the Node mock server (mock-server.ts) so file I/O stays out of
// the browser bundle. Keeping fs/promises out of this module prevents build
// tools that re-bundle (e.g. next-on-pages) from failing to resolve it.
export const setPersistence = (p: Persistence | null) => {
  persistence = p;
};

export const loadDb = async () => {
  if (persistence) {
    const data = await persistence.load();
    return data ?? {};
  }
  // If we are running in a browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    return Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'));
  }
  return {};
};

export const storeDb = async (data: string) => {
  if (persistence) {
    await persistence.store(data);
    return;
  }
  // If we are running in a browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('msw-db', data);
  }
};

export const persistDb = async (model: Model) => {
  if (process.env.NODE_ENV === 'test') return;
  const data = await loadDb();
  data[model] = db[model].getAll();
  await storeDb(JSON.stringify(data));
};

export const initializeDb = async () => {
  const database = await loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
};
