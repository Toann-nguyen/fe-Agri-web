export default {
  '*.{json,md,yaml,yml}': ['prettier --write'],

  'apps/nextjs-app/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `pnpm --filter fe-agri-nextjs-app exec next lint --fix --file ${filenames.map((f) => `"${f}"`).join(' --file ')}`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
  'apps/react-vite/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `pnpm --filter bulletproof-react-vite exec eslint --fix ${filenames.map((f) => `"${f}"`).join(' ')}`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
  'apps/nextjs-pages/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `pnpm --filter fe-agri-nextjs-pages exec next lint --fix --file ${filenames.map((f) => `"${f}"`).join(' --file ')}`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
};
