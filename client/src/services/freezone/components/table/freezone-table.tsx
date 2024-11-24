import { useFreezoneItems } from '../../api';

import { AppTable } from '@/components/ui';
import { useFreezoneColumns } from './freezone-columns';
import { FreezoneTableExpanded } from './freezone-table-expanded';

export const FreezoneTable = () => {
  const { columns } = useFreezoneColumns();

  const freezoneItemsQuery = useFreezoneItems({});
  const freezoneItems = freezoneItemsQuery.data?.data;

  if (!freezoneItems) return null;

  return (
    <AppTable
      columns={columns}
      data={freezoneItems}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <FreezoneTableExpanded row={row} />}
      fallback={freezoneItemsQuery.data?.message}
    />
  );
};
