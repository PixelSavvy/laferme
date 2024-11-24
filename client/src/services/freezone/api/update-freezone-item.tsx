import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { UpdateEntity } from '@/shared/types';
import { Freezone } from '../schema';
import { getFreezoneItemsQueryOptions } from './get-freezone-items';

export const updateFreezoneItem = async ({ data, freezoneId }: { data: Freezone; freezoneId: number }) => {
  const productURL = `/freezone-items/${freezoneId}`;

  try {
    const response: AxiosResponse<UpdateEntity> = await api.patch(productURL, data);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateFreezoneItemOptions = {
  mutationConfig?: MutationConfig<typeof updateFreezoneItem>;
};

export const useUpdateFreezoneItem = ({ mutationConfig }: UseUpdateFreezoneItemOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getFreezoneItemsQueryOptions().queryKey,
      });
      await queryClient.invalidateQueries({ queryKey: ['distribution'] });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateFreezoneItem,
  });
};
