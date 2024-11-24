import { Badge } from '@/components/ui';
import { Row } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Order } from '../../schema';

export const OrderStatusCell = ({ row }: { row: Row<Order> }) => {
  const statusStyles = useMemo(
    () =>
      ({
        TODELIVER: {
          text: 'მისატანი',
          variant: 'TODELIVER' as Order['status'],
        },
        DELIVERED: {
          text: 'მიტანილი',
          variant: 'DELIVERED' as Order['status'],
        },
        RETURNED: {
          text: 'დაბრუნებული',
          variant: 'RETURNED' as Order['status'],
        },
        PREPARING: {
          text: 'მზადდება',
          variant: 'PREPARING' as Order['status'],
        },
        PREPARED: {
          text: 'დამზადდა',
          variant: 'PREPARED' as Order['status'],
        },
        CANCELLED: {
          text: 'გაუქმებული',
          variant: 'CANCELLED' as Order['status'],
        },
        READYTODELIVER: {
          text: 'სადისტრიბუციო',
          variant: 'READYTODELIVER' as Order['status'],
        },
      }) as const,
    []
  );

  const status = row.original.status;
  const statusInfo = statusStyles[status];

  if (!statusInfo) {
    return null;
  }

  return (
    <div>
      <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
    </div>
  );
};
