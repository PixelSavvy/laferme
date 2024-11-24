import * as React from 'react';

import { cn } from '@/utils/cn';

export type InputProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, showLeftIcon = false, showRightIcon = false, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) props.onChange(e);
    };

    return (
      <div className={cn('flex justify-center items-center relative')}>
        {/* Left Icon */}
        {showLeftIcon && leftIcon && (
          <span className={cn('flex items-center justify-center absolute left-[0.1875rem] w-4 h-4 transition-colors')}>
            {leftIcon}
          </span>
        )}

        {/* Input Field */}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-background p-3 ring-offset-background outline-none placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-foreground disabled:text-neutral-800 disabled:border-neutral-800 hover:border-primary-950 peer typo-label-md',
            showLeftIcon && leftIcon ? 'pl-[0.6875rem]' : '',
            showRightIcon && rightIcon ? 'pr-[0.6875rem]' : '',
            className
          )}
          onChange={handleChange}
          ref={ref}
          {...props}
        />

        {/* Right Icon */}
        {showRightIcon && rightIcon && (
          <span className={cn('flex items-center justify-center absolute right-[0.1875rem] w-4 h-4 transition-colors')}>
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
