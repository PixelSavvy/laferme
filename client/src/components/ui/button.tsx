import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-background hover:bg-primary-300 focus-visible:bg-primary-300 active:bg-primary-600 disabled:bg-primary-100',
        ghost:
          'bg-transparent text-foreground hover:bg-neutral-300 focus-visible:bg-neutral-300 active:bg-neutral-400 disabled:bg-neutral-500 disabled:text-neutral-500',
        outline:
          'border border-primary-950 bg-transparent text-foreground hover:border-transparent hover:bg-primary-500 hover:text-background focus-visible:border-transparent focus-visible:bg-primary-500 focus-visible:text-foreground active:border-transparent active:bg-primary-600 disabled:border-neutral-500 disabled:bg-neutral-500 disabled:text-neutral-500',
        danger:
          'bg-danger-500 text-background hover:bg-danger-300 focus-visible:bg-danger-300 active:bg-danger-600 disabled:bg-danger-100',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
