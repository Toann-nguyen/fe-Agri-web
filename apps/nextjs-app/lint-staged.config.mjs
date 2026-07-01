import path from 'path';

const buildEslintCommand = (filenames) => {
  const filesToLint = filenames
    .filter((f) => f.includes('/src/'))
    .map((f) => path.relative(process.cwd(), f));

  if (filesToLint.length === 0) {
    return [];
  }

  return `next lint --fix --file ${filesToLint.join(' --file ')}`;
};

const config = {
  '*.{ts,tsx}': [buildEslintCommand, "bash -c 'pnpm check-types'"],
};

export default config;
