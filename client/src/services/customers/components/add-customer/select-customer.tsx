import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useCustomers } from '../../api';
import { Customer } from '../../schema';

type SelectCustomerProps = {
  onChange: (data: Customer) => void;
};

export const SelectCustomer = ({ onChange }: SelectCustomerProps) => {
  const { data: customers } = useCustomers({});

  const onValueChange = (id: string) => {
    const selected = customers?.data.find((customer) => customer.id?.toString() === id);

    if (selected) {
      onChange(selected);
    }
  };

  return (
    <Select onValueChange={(val) => onValueChange(val)}>
      <SelectTrigger>
        <SelectValue placeholder="აირჩიე სარეალიზაციო პუნქტი" />
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <SelectGroup>
          {customers?.data.map((customer) => (
            <SelectItem key={customer.id!.toString()} value={customer.id!.toString()}>
              {customer.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
