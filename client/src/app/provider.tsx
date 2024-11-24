import * as React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { queryConfig } from '@/lib/react-query';

type TAppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: TAppProviderProps) => {
  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: queryConfig }));

  return (
    // Update Fallbacks
    <React.Suspense fallback={'loading'}>
      <ErrorBoundary fallback={'error'}>
        <HelmetProvider>
          {/* Query Client Provider */}
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            {children}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
