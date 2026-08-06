import path from 'path';

const buildEslintCommand = (filenames) => {
  const filesToLint = filenames
    .filter((f) => /\.(js|jsx|ts|tsx)$/.test(f))
    .map((f) => path.relative(process.cwd(), f));

  if (filesToLint.length === 0) {
    return [];
  }

  return `next lint --fix --file ${filesToLint.join(' --file ')}`;
};

const config = {
  '*.{ts,tsx,js,jsx}': [buildEslintCommand, "bash -c 'pnpm check-types'"],
};

export default config;
