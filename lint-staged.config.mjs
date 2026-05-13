import path from 'path';

export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  'apps/nextjs-app/src/**/*.{ts,tsx}': () => ['pnpm --filter fe-agri-nextjs-app check-types'],
  'apps/react-vite/src/**/*.{ts,tsx}': () => ['pnpm --filter bulletproof-react-vite check-types'],
  'apps/nextjs-pages/src/**/*.{ts,tsx}': () => ['pnpm --filter fe-agri-nextjs-pages check-types'],
};
