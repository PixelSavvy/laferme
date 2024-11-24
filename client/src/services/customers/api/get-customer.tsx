import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Customer } from '../schema';

import { api, handleAxiosError } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { GetEntity } from '@/shared/types';

export const getCustomer = async ({ customerId }: { customerId: number }) => {
  try {
    const customerURL = `/customers/${customerId.toString()}`;
    const response: AxiosResponse<GetEntity<Customer>> = await api.get(customerURL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getCustomerQueryOptions = (customerId: number) => {
  return queryOptions({
    queryKey: ['customers', customerId],
    queryFn: () => getCustomer({ customerId }),
  });
};

type UseCustomerOptions = {
  customerId: number;
  queryConfig?: QueryConfig<typeof getCustomerQueryOptions>;
};

export const useCustomer = ({ customerId, queryConfig }: UseCustomerOptions) => {
  return useQuery({
    ...getCustomerQueryOptions(customerId),
    ...queryConfig,
  });
};
