import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layout';
import { getCustomersQueryOptions } from '@/services/customers/api';
import { useCustomerStore } from '@/services/customers/store';
import { AddOrder, OrderTable } from '@/services/orders/components';

export const ordersLoader = (queryClient: QueryClient) => async () => {
  const query = getCustomersQueryOptions();
  const customersQuery = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  const setCustomers = useCustomerStore.getState().setCustomers;

  if (customersQuery.data) setCustomers(customersQuery.data);

  return customersQuery.data;
};

export const OrdersRoute = () => {
  return (
    <ContentLayout title="მიმდინარე შეკვეთები">
      <div className="flex justify-end">
        <AddOrder />
      </div>
      <div className="mt-6">
        <OrderTable />
      </div>
    </ContentLayout>
  );
};
