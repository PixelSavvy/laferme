import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Order } from '../schema';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { UpdateEntity } from '@/shared/types';
import { getOrdersQueryOptions } from './get-orders';

export const updateOrder = async ({ data, orderId }: { data: Order['products']; orderId: number }) => {
  const productURL = `/orders/${orderId}`;

  try {
    const response: AxiosResponse<UpdateEntity> = await api.patch(productURL, data);

    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateOrderOptions = {
  mutationConfig?: MutationConfig<typeof updateOrder>;
};

export const useUpdateOrder = ({ mutationConfig }: UseUpdateOrderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      });

      await queryClient.invalidateQueries({ queryKey: ['freezone-items'] });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateOrder,
  });
};
