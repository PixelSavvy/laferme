import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 typo-label-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 lowercase',
  {
    variants: {
      variant: {
        TODELIVER: 'bg-info-50 border border-info-500 text-info-500 hover:bg-info-100/80',
        DELIVERED: 'bg-success-50 border border-success-500 text-success-500 hover:bg-success-100/80',
        RETURNED: 'bg-warning-50 border border-warning-500 text-warning-500 hover:bg-warning-100/80',
        PREPARING: 'bg-violet-50 border border-violet-500 text-violet-500 hover:bg-violet-100/80',
        PREPARED: 'bg-amber-50 border border-amber-500 text-amber-500 hover:bg-amber-100/80',
        CANCELLED: 'bg-danger-50 border border-danger-500 text-danger-500 hover:bg-danger-100/80',
        READYTODELIVER: 'bg-primary-50 border border-primary-500 text-primary-500 hover:bg-primary-100/80',

        CASH: 'bg-primary-50 border border-primary-500 text-primary-500 hover:bg-primary-100/80',
        TRANSFER: 'bg-info-50 border border-info-500 text-info-500 hover:bg-info-100/80',
        CONSIGNMENT: 'bg-warning-50 border border-warning-500 text-warning-500 hover:bg-warning-100/80',
        TRIAL: 'bg-neutral-50 border border-neutral-500 text-neutral-500 hover:bg-neutral-100/80',
        DISCOUNTED: 'bg-danger-50 border border-danger-500 text-danger-500 hover:bg-danger-100/80',
      },
    },
    defaultVariants: {
      variant: 'TODELIVER',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
