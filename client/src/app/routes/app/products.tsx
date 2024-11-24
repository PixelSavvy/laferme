import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layout';
import { AddProduct, getProductsQueryOptions, ProductTable, useProductStore } from '@/services/products';

export const productsLoader = (queryClient: QueryClient) => async () => {
  const query = getProductsQueryOptions();
  const productsQuery = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  const setProducts = useProductStore.getState().setProducts;

  if (productsQuery.data) setProducts(productsQuery.data);

  return productsQuery.data;
};

export const ProductsRoute = () => {
  return (
    <ContentLayout title="პროდუქტები">
      <div className="flex justify-end">
        <AddProduct />
      </div>
      <div className="mt-6">
        <ProductTable />
      </div>
    </ContentLayout>
  );
};
