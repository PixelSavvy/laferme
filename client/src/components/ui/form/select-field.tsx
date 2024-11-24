import { Control, FieldValues } from 'react-hook-form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';

import { cn } from '@/utils';

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  items: {
    label: string;
    value: string;
  }[];
};

export const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  className,
  placeholder,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('max-w-max', className)}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value as string}
          >
            <FormControl className="mt-1">
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
