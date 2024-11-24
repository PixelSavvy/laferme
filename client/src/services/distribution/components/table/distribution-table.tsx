import { AppTable } from '@/components/ui';
import { useDistributionItems } from '../../api';
import { useDistributionColumns } from './distribution-columns';
import { DistributionTableExpanded } from './distribution-table-expanded';

export const DistributionTable = () => {
  const { columns } = useDistributionColumns();

  const distributionQuery = useDistributionItems({});
  const distribution = distributionQuery.data?.data;

  if (!distribution) return null;

  return (
    <AppTable
      columns={columns}
      data={distribution}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <DistributionTableExpanded row={row} />}
      fallback={'მონაცემი ვერ მოიძებნა'}
    />
  );
};
