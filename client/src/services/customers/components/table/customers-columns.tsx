import * as React from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Hash } from 'lucide-react';

import { Customer } from '../../schema';
import { CustomerPaymentCell } from './customer-payment-cell';

export const useCustomersColumns = () => {
  const columns = React.useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => {
          return <Hash size={16} />;
        },
      },
      {
        accessorKey: 'priceIndex',
        header: 'ინდექსი',
      },
      {
        accessorKey: 'name',
        header: 'სარეალიზაციო პუნქი',
      },

      {
        accessorKey: 'paymentOption',
        header: 'გადახდის მეთოდი',
        cell: ({ row }) => <CustomerPaymentCell paymentOption={row.original.paymentOption} />,
      },

      {
        accessorKey: 'needsInvoice',
        header: 'ინვოისი',
        cell: ({ row }) => (row.original.needsInvoice === '1' ? 'კი' : 'არა'),
      },
      {
        accessorKey: 'phone',
        header: 'ტელეფონი',
      },
      {
        accessorKey: 'email',
        header: 'იმეილი',
      },
    ],
    []
  );

  return { columns };
};
