import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layout';
import { getCustomersQueryOptions } from '@/services/customers/api';
import { AddCustomer, CustomerTable } from '@/services/customers/components';
import { useCustomerStore } from '@/services/customers/store';

export const customersLoader = (queryClient: QueryClient) => async () => {
  const query = getCustomersQueryOptions();
  const customersQuery = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  const setCustomers = useCustomerStore.getState().setCustomers;

  if (customersQuery.data) setCustomers(customersQuery.data);

  return customersQuery.data;
};

export const CustomersRoute = () => {
  return (
    <ContentLayout title="სარეალიზაციო პუნქტი">
      <div className="flex justify-end">
        <AddCustomer />
      </div>
      <div className="mt-6">
        <CustomerTable />
      </div>
    </ContentLayout>
  );
};
