import React from 'react';

import { ColumnDef } from '@tanstack/react-table';

import { AppTableCellAction } from '@/components/ui';
import { formatDate } from '@/utils';
import { Freezone } from '../../schema';
import { FreezoneCustomerCell } from './freezone-customer-cell';
import { FreezoneStatusCell } from './freezone-status-cell';

export const useFreezoneColumns = () => {
  const columns = React.useMemo<ColumnDef<Freezone>[]>(
    () => [
      {
        accessorKey: 'customer',
        header: 'სარეალიზაციო პუნქტი',
        cell: ({ row }) => <FreezoneCustomerCell row={row} />,
      },
      {
        accessorKey: 'createdAt',
        header: 'წარმოების თარიღი',
        cell: ({ row }) => formatDate(row.original.createdAt!),
      },
      {
        accessorKey: 'status',
        header: 'სტატუსი',
        cell: ({ row }) => <FreezoneStatusCell row={row} />,
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
