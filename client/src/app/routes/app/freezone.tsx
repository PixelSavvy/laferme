import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layout';
import { getFreezoneItemsQueryOptions } from '@/services/freezone/api';
import { FreezoneTable } from '@/services/freezone/components/table/freezone-table';

export const freezoneLoader = (queryClient: QueryClient) => async () => {
  const query = getFreezoneItemsQueryOptions();
  const freezoneItemQuery = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  if (!freezoneItemQuery.data) return null;

  return freezoneItemQuery.data;
};

export const FreezoneRoute = () => {
  return (
    <ContentLayout title="თავისუფალი ზონა">
      <div className="mt-6">
        <FreezoneTable />
      </div>
    </ContentLayout>
  );
};
