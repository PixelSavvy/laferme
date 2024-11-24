import * as React from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Hash } from 'lucide-react';
import { Product } from '../../schema';

export const useProductColumns = () => {
  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => {
          return <Hash size={16} />;
        },
      },

      {
        accessorKey: 'productCode',
        header: 'SKU',
      },
      {
        accessorKey: 'isVAT',
        header: 'VAT',
        cell: ({ row }) => (row.original.shouldVAT === '1' ? 'კი' : 'არა'),
      },
      {
        accessorKey: 'title',
        header: 'პროდუქტი',
      },
      {
        accessorKey: 'prices.TR1',
        header: 'TR1',
      },
      {
        accessorKey: 'prices.TR2',
        header: 'TR2',
      },
      {
        accessorKey: 'prices.TR3',
        header: 'TR3',
      },
      {
        accessorKey: 'prices.TR4',
        header: 'TR4',
      },
      {
        accessorKey: 'prices.TR5',
        header: 'TR5',
      },
      {
        accessorKey: 'prices.TRD',
        header: 'TRD',
      },
      {
        accessorKey: 'prices.TRC',
        header: 'TRC',
      },
    ],
    []
  );

  return { columns };
};
