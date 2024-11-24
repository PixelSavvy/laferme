import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Order } from '../schema';

import { api, handleAxiosError } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { GetEntities } from '@/shared/types';

export const getOrders = async () => {
  try {
    const response: AxiosResponse<GetEntities<Order>> = await api.get('/orders');
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
  });
};

type UseGetOrdersOptions = {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
};

export const useOrders = ({ queryConfig }: UseGetOrdersOptions) => {
  return useQuery({
    ...getOrdersQueryOptions(),
    ...queryConfig,
  });
};
