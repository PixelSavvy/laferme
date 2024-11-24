import * as React from 'react';

import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppRoot, AppRootErrorBoundary } from './routes/app/root';

import { paths } from '@/config';

const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter(
    [
      {
        path: paths.app.root.path,
        element: <AppRoot />,
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          // Products
          {
            path: paths.app.products.path,
            lazy: async () => {
              const { ProductsRoute, productsLoader } = await import('./routes/app/products');
              return { Component: ProductsRoute, loader: productsLoader(queryClient) };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          // Customers
          {
            path: paths.app.customers.path,
            lazy: async () => {
              const { CustomersRoute, customersLoader } = await import('./routes/app/customers');
              return { Component: CustomersRoute, laoder: customersLoader(queryClient) };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          // Orders
          {
            path: paths.app.orders.path,
            lazy: async () => {
              const { OrdersRoute, ordersLoader } = await import('./routes/app/orders');
              return { Component: OrdersRoute, laoder: ordersLoader(queryClient) };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          // Freezone
          {
            path: paths.app.freezone.path,
            lazy: async () => {
              const { FreezoneRoute, freezoneLoader } = await import('./routes/app/freezone');
              return { Component: FreezoneRoute, laoder: freezoneLoader(queryClient) };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          // Distribution
          {
            path: paths.app.distribution.path,
            lazy: async () => {
              const { DistributionRoute, distributionLoader } = await import('./routes/app/distribution');
              return { Component: DistributionRoute, loader: distributionLoader(queryClient) };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: '*',
            lazy: async () => {
              const { NotFoundRoute } = await import('./routes/not-found');
              return { Component: NotFoundRoute };
            },
          },
        ],
      },
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = React.useMemo(() => createAppRouter(queryClient), [queryClient]);

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};
