import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Product } from '../schema';

import { api, handleAxiosError } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { GetEntity } from '@/shared/types';

export const getProduct = async ({ productId }: { productId: number }) => {
  try {
    const productURL = `/products/${productId.toString()}`;
    const response: AxiosResponse<GetEntity<Product>> = await api.get(productURL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getProductQueryOptions = (productId: number) => {
  return queryOptions({
    queryKey: ['products', productId],
    queryFn: () => getProduct({ productId }),
  });
};

type UseProductOptions = {
  productId: number;
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
};

export const useProduct = ({ productId, queryConfig }: UseProductOptions) => {
  return useQuery({
    ...getProductQueryOptions(productId),
    ...queryConfig,
  });
};
