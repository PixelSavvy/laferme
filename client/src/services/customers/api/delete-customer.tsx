import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getCustomersQueryOptions } from './get-customers';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { DeleteEntity } from '@/shared/types';

export const deleteCustomer = async ({ customerId }: { customerId: number }) => {
  try {
    const customerURL = `/customers/${customerId.toString()}`;
    const response: AxiosResponse<DeleteEntity> = await api.delete(customerURL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseDeleteCustomerOptions = {
  mutationConfig?: MutationConfig<typeof deleteCustomer>;
};

export const useDeleteCustomer = ({ mutationConfig }: UseDeleteCustomerOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getCustomersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteCustomer,
  });
};
