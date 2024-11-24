import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api, handleAxiosError } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { GetEntities } from '@/shared/types';
import { Order } from '../schema';

const getOrder = async (orderId: number) => {
  const path = `/orders/${orderId.toString()}`;

  try {
    const response: AxiosResponse<GetEntities<Order>> = await api.get(path);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getOrderQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['products'],
    queryFn: () => getOrder(id),
  });
};
type useOrderOptions = {
  queryConfig?: QueryConfig<typeof getOrderQueryOptions>;
  orderId: number;
};

export const useOrder = ({ queryConfig, orderId }: useOrderOptions) => {
  return useQuery({
    ...getOrderQueryOptions(orderId),
    ...queryConfig,
  });
};
