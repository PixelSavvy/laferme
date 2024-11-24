import { ContentLayout } from '@/components/layout';
import { DistributionTable } from '@/services/distribution';
import { getDistributionItemsQueryOptions } from '@/services/distribution/api/get-distribution-items';
import { QueryClient } from '@tanstack/react-query';

export const distributionLoader = (queryClient: QueryClient) => async () => {
  const query = getDistributionItemsQueryOptions();
  const distributionItemQuery = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  if (!distributionItemQuery.data) return null;

  return distributionItemQuery.data;
};

export const DistributionRoute = () => {
  return (
    <ContentLayout title="დისტრიბუცია">
      <div className="mt-6">
        <DistributionTable />
      </div>
    </ContentLayout>
  );
};
