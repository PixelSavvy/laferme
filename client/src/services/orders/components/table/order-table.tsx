import { useOrders } from '../../api';
import { useOrderStore } from '../../store';
import { useOrderColumns } from './order-columns';
import { OrderTableExpanded } from './order-table-expanded';

import { AppTable } from '@/components/ui';

export const OrderTable = () => {
  const { columns } = useOrderColumns();
  const isAddingOrder = useOrderStore();

  const ordersQuery = useOrders({});
  const orders = ordersQuery.data?.data;

  if (!orders) return null;

  return (
    <AppTable
      key={isAddingOrder ? 'adding-order' : 'viewing-order'}
      columns={columns}
      data={orders}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <OrderTableExpanded row={row} />}
      fallback={ordersQuery.data?.message}
    />
  );
};
