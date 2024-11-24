import { Badge } from '@/components/ui';
import { Freezone } from '@/services/freezone/schema';
import { Row } from '@tanstack/react-table';
import { useMemo } from 'react';

export const FreezoneStatusCell = ({ row }: { row: Row<Freezone> }) => {
  const statusStyles = useMemo(
    () =>
      ({
        TODELIVER: {
          text: 'მისატანი',
          variant: 'TODELIVER' as Freezone['status'],
        },
        DELIVERED: {
          text: 'მიტანილი',
          variant: 'DELIVERED' as Freezone['status'],
        },
        RETURNED: {
          text: 'დაბრუნებული',
          variant: 'RETURNED' as Freezone['status'],
        },
        PREPARING: {
          text: 'მზადდება',
          variant: 'PREPARING' as Freezone['status'],
        },
        PREPARED: {
          text: 'დამზადდა',
          variant: 'PREPARED' as Freezone['status'],
        },
        CANCELLED: {
          text: 'გაუქმებული',
          variant: 'CANCELLED' as Freezone['status'],
        },
        READYTODELIVER: {
          text: 'სადისტრიბუციო',
          variant: 'READYTODELIVER' as Freezone['status'],
        },
      }) as const,
    []
  );

  const status = row.original.status;
  const statusInfo = statusStyles[status];

  return (
    <div>
      <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
    </div>
  );
};
