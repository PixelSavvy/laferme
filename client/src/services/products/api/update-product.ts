import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Product } from '../schema';
import { getProductsQueryOptions } from './get-products';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { UpdateEntity } from '@/shared/types';

export const updateProduct = async ({ data, productId }: { data: Product; productId: number }) => {
  const productURL = `/products/${productId}`;

  try {
    const response: AxiosResponse<UpdateEntity> = await api.patch(productURL, data);

    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateProductOptions = {
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({ mutationConfig }: UseUpdateProductOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateProduct,
  });
};
