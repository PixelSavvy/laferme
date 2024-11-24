import { Control, FieldValues } from 'react-hook-form';
import { Input } from '../input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';

type InputFieldProps<T extends FieldValues> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'id'> & {
  control: Control<T>;
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
};

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  className = '',
  disabled = false,
  ...inputProps // Spread any additional input attributes
}: InputFieldProps<T>) => (
  <FormField
    control={control as Control<FieldValues>}
    name={name}
    render={({ field }) => (
      <FormItem className={`w-full ${className}`}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <FormControl className="w-full mt-1">
          <Input
            {...field}
            {...inputProps}
            type={type}
            id={name}
            name={name}
            className="w-full"
            disabled={disabled}
            min={type === 'number' ? 0 : undefined}
            step={type === 'number' ? 0.01 : undefined}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
