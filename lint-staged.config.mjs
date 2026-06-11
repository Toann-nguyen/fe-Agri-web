export default {
  '*.{json,md,yaml,yml}': ['prettier --write'],

  'apps/nextjs-app/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `pnpm --filter fe-agri-nextjs-app exec eslint --fix ${filenames.map((f) => `"${f}"`).join(' ')}`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
  'apps/react-vite/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `pnpm --filter bulletproof-react-vite exec eslint --fix ${filenames.map((f) => `"${f}"`).join(' ')}`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
  'apps/nextjs-pages/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `pnpm --filter fe-agri-nextjs-pages exec eslint --fix ${filenames.map((f) => `"${f}"`).join(' ')}`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],

  'apps/nextjs-app/src/**/*.{ts,tsx}': () => [
    'pnpm --filter fe-agri-nextjs-app check-types',
  ],
  'apps/react-vite/src/**/*.{ts,tsx}': () => [
    'pnpm --filter bulletproof-react-vite check-types',
  ],
  'apps/nextjs-pages/src/**/*.{ts,tsx}': () => [
    'pnpm --filter fe-agri-nextjs-pages check-types',
  ],
};

