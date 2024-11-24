import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Customer } from '../schema';
import { getCustomersQueryOptions } from './get-customers';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { AddEntity } from '@/shared/types';

export const addCustomer = async (data: Customer) => {
  try {
    const response: AxiosResponse<AddEntity> = await api.post('/customers', data);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseAddCustomerOptions = {
  mutationConfig?: MutationConfig<typeof addCustomer>;
};

export const useAddCustomer = ({ mutationConfig }: UseAddCustomerOptions) => {
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
    mutationFn: addCustomer,
  });
};
