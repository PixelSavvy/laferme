import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { AppTableCellAction } from '@/components/ui';
import { CustomerPaymentCell } from '@/services/customers/components';
import { formatDate } from '@/utils';
import { Distribution } from '../../schema';
import { DistributionCustomerCell } from './distribution-customer-cell';
import { DistributionStatusCell } from './distribution-status-cell';

export const useDistributionColumns = () => {
  const columns = React.useMemo<ColumnDef<Distribution>[]>(
    () => [
      {
        accessorKey: 'createdAt',
        header: 'მიტანის თარიღი',
        cell: ({ row }) => <span>{formatDate(row.original.createdAt!)}</span>,
      },
      {
        accessorKey: 'customer',
        header: 'სარეალიზაციო პუნქტი',
        cell: ({ row }) => <DistributionCustomerCell row={row} />,
      },
      {
        accessorFn: (row) => row.products.map((product) => product.pricePerKilo.toFixed(2)).join(', '),
        header: 'ფასი',
        id: 'pricePerKilo',
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        accessorFn: (row) => row.products.reduce((total, product) => total + product.distributedWeight, 0).toFixed(2),
        header: 'წონა',
        id: 'distributedWeight',
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        accessorFn: (row) =>
          row.products.reduce((acc, product) => acc + product.distributedWeight * product.pricePerKilo, 0).toFixed(2),
        header: 'ჯამი',
        id: 'totalPrice',
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        accessorKey: 'customer.paymentOption',
        header: 'გადახდა',
        cell: ({ row }) => <CustomerPaymentCell paymentOption={row.original.customer.paymentOption} />,
      },
      {
        accessorKey: 'status',
        header: 'სტატუსი',
        cell: ({ row }) => <DistributionStatusCell row={row} />,
      },
      {
        id: 'actions',
        cell: () => <AppTableCellAction />,
      },
    ],
    []
  );

  return { columns };
};
