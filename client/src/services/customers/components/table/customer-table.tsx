import { useCustomers } from '../../api';
import { CustomerTableExpanded } from './customer-table-expanded';
import { useCustomersColumns } from './customers-columns';

import { AppTable } from '@/components/ui';

export const CustomerTable = () => {
  const { columns } = useCustomersColumns();

  const customersQuery = useCustomers({});
  const customers = customersQuery.data?.data;

  if (!customers) return null;

  return (
    <AppTable
      data={customers}
      columns={columns}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <CustomerTableExpanded row={row} />}
      fallback={customersQuery.data?.message}
    />
  );
};
