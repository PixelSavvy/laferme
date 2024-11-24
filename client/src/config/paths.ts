export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    logout: {
      path: '/auth/logout',
      getHref: (redirectTo?: string | null) =>
        `/auth/logout${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },
  app: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    orders: {
      path: '/orders/current',
      getHref: () => '/orders/current',
    },
    freezone: {
      path: '/free-zone/current',
      getHref: () => '/free-zone/current',
    },
    distribution: {
      path: '/distribution/current',
      getHref: () => '/distribution/current',
    },
    customers: {
      path: '/customers',
      getHref: () => '/customers',
    },
    products: {
      path: '/products',
      getHref: () => '/products',
    },
  },
} as const;
