// src/services/orders/api.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { AddEntity } from '@/shared/types';
import { NewOrder } from '../schema';

export const addOrder = async (data: NewOrder) => {
  try {
    const response: AxiosResponse<AddEntity> = await api.post('/orders', data);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseAddOrderOptions = {
  mutationConfig?: MutationConfig<typeof addOrder>;
};

export const useAddOrder = ({ mutationConfig }: UseAddOrderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['freezone-items'] });
    },
    ...restConfig,
    mutationFn: addOrder,
  });
};
