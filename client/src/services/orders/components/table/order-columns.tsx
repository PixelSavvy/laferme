import React from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Hash } from 'lucide-react';

import { Order } from '../../schema';

import { AppTableCellAction } from '@/components/ui';

import { formatDate } from '@/utils';
import { OrderCustomerCell } from './order-customer-cell';
import { OrderStatusCell } from './order-status-cell';

export const useOrderColumns = () => {
  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => {
          return <Hash size={16} />;
        },
      },
      {
        accessorKey: 'customer',
        header: 'სარეალიზაციო პუნქტი',
        cell: ({ row }) => <OrderCustomerCell row={row} />,
      },
      {
        accessorKey: 'createdAt',
        header: 'წარმოების თარიღი',
        cell: ({ row }) => formatDate(row.original.createdAt!),
      },
      {
        accessorKey: 'status',
        header: 'სტატუსი',
        cell: ({ row }) => <OrderStatusCell row={row} />,
      },
      {
        id: 'actions',
        cell: () => {
          return <AppTableCellAction />;
        },
      },
    ],
    []
  );

  return { columns };
};
