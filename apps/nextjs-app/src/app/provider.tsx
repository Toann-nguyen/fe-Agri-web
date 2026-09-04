'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

import { MainErrorFallback } from '@/components/errors/main';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { queryConfig } from '@/lib/api/query-client';
import { useSessionAutoRefresh } from '@/lib/auth/use-auto-refresh';
import { enableMocking } from '@/testing/mocks';

function SessionAutoRefresh() {
  useSessionAutoRefresh(true);
  return null;
}

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  React.useEffect(() => {
    enableMocking();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {process.env.DEV && <ReactQueryDevtools />}
          <Toaster position="top-right" />
          <SessionAutoRefresh />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
