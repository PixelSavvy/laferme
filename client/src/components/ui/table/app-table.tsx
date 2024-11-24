import * as React from 'react';

import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, Row, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

import { cn } from '@/utils/cn';

type AppTableProps<Data, Value> = {
  columns: ColumnDef<Data, Value>[];
  data: Data[];
  getRowCanExpand?: (row: Row<Data>) => boolean;
  renderSubComponent?: (props: { row: Row<Data> }) => React.ReactNode;
  fallback?: string;
};

export const AppTable = <Data, Value>({
  columns,
  data,
  getRowCanExpand = () => false,
  renderSubComponent,
  fallback,
}: AppTableProps<Data, Value>) => {
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Table>
      {/* Render the table headers */}
      <TableHeader className={cn('border-none')}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <TableHead
                key={header.id}
                className={cn(
                  'bg-primary-500 text-background py-4 px-3',
                  index === 0 && 'rounded-l-md',
                  index === headerGroup.headers.length - 1 && 'rounded-r-md'
                )}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      {/* Render the table body */}
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              {/* Main row with an onClick handler for expansion */}
              <TableRow className={cn('cursor-pointer hover:bg-neutral-100')} onClick={() => row.toggleExpanded()}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn('border-b p-3 first:rounded-l-2 last:rounded-r-2')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {/* Expanded row rendering if row is expanded */}
              {row.getIsExpanded() && renderSubComponent && (
                <TableRow>
                  <TableCell colSpan={row.getVisibleCells().length} className="border-b py-6 px-10">
                    {renderSubComponent({ row })}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="p-4 text-start">
              {fallback}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
