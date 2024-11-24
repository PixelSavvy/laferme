import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api, handleAxiosError } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { UpdateEntity } from '@/shared/types';

import { Distribution } from '../schema';
import { getDistributionItemsQueryOptions } from './get-distribution-items';

export const updateDistributionItem = async ({
  data,
  distributionItemId,
}: {
  data: Distribution;
  distributionItemId: number;
}) => {
  const productURL = `/distribution/${distributionItemId}`;

  try {
    const response: AxiosResponse<UpdateEntity> = await api.patch(productURL, data);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateDistributionItemOptions = {
  mutationConfig?: MutationConfig<typeof updateDistributionItem>;
};

export const useUpdateDistributionItem = ({ mutationConfig }: UseUpdateDistributionItemOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getDistributionItemsQueryOptions().queryKey,
      });
      await queryClient.invalidateQueries({ queryKey: ['distribution'] });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateDistributionItem,
  });
};
