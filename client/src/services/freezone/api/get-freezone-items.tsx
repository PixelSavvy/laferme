import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Freezone } from '../schema';

import { api, handleAxiosError } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { GetEntities } from '@/shared/types';

export const getFreezoneItems = async () => {
  try {
    const response: AxiosResponse<GetEntities<Freezone>> = await api.get('/freezone-items');
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getFreezoneItemsQueryOptions = () => {
  return queryOptions({
    queryKey: ['freezone-items'],
    queryFn: () => getFreezoneItems(),
  });
};

type UseGetFreezoneItemsOptions = {
  queryConfig?: QueryConfig<typeof getFreezoneItemsQueryOptions>;
};

export const useFreezoneItems = ({ queryConfig }: UseGetFreezoneItemsOptions) => {
  return useQuery({
    ...getFreezoneItemsQueryOptions(),
    ...queryConfig,
  });
};
