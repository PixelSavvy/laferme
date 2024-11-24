import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getProductsQueryOptions } from './get-products';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { AddEntity } from '@/shared/types';
import { Product } from '../schema';

const addProduct = async (data: Product) => {
  try {
    const response: AxiosResponse<AddEntity> = await api.post('/products', data);

    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseAddProductOptions = {
  mutationConfig?: MutationConfig<typeof addProduct>;
};

export const useAddProduct = ({ mutationConfig }: UseAddProductOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addProduct,
  });
};
