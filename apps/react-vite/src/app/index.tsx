import { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { createI18nextInstance } from '@/i18n';

import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  const i18n = useMemo(() => createI18nextInstance(), []);

  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </I18nextProvider>
  );
};
