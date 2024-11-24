import { Fragment, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useAddCustomer } from '../../api/add-customer';
import { Customer, customerDefaultValues, customerSchema } from '../../schema';

import { Button, DrawerClose, DrawerFooter, Form, InputField, SelectField } from '@/components/ui';
import { Product, SelectProduct } from '@/services/products';

type AddCustomerFormProps = {
  onCustomerAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const invoiceOptions = [
  { label: 'კი', value: '1' },
  { label: 'არა', value: '0' },
];

const paymentOptions = [
  { label: 'ქეში', value: 'CASH' },
  { label: 'ტრანსფერი', value: 'TRANSFER' },
  { label: 'კონსიგნაცია', value: 'CONSIGNMENT' },
  { label: 'სატესტო', value: 'TRIAL' },
  { label: 'ფასდაკლებული', value: 'DISCOUNTED' },
];

const priceIndexes = [
  { label: 'TR1', value: 'TR1' },
  { label: 'TR2', value: 'TR2' },
  { label: 'TR3', value: 'TR3' },
  { label: 'TR4', value: 'TR4' },
  { label: 'TR5', value: 'TR5' },
  { label: 'TRD', value: 'TRD' },
  { label: 'TRC', value: 'TRC' },
];

export const AddCustomerForm = ({ onCustomerAdd }: AddCustomerFormProps) => {
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  const { mutate: addCustomer, isPending } = useAddCustomer({});

  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerDefaultValues,
  });

  const { prepend, remove, fields } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  const onProductSelect = (val: Product) => {
    prepend(val);
    setIsSelectingProduct((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Customer> = (payload) => {
    addCustomer(payload, {
      onSuccess: () => {
        onCustomerAdd((prev) => !prev);
        form.reset();
      },
    });
  };

  const selectedProductCodes = fields.map((field) => field.productCode);

  return (
    <Form {...form}>
      <form className="grid gap-3" onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        {/* Form Fields */}
        <div className="flex flex-col gap-3">
          <h2 className="col-span-full font-medium typo-label-md">ძირითადი ინფორმაცია</h2>
          <InputField control={form.control} name="name" label="სახელი" type="text" />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Price Index */}
          <SelectField
            control={form.control}
            label="საფასო ინდექსი"
            name="priceIndex"
            items={priceIndexes}
            placeholder="ინდექსი"
            className="min-w-[120px]"
          />
          {/* Payment Option */}
          <SelectField
            control={form.control}
            label="გადახდის მეთოდი"
            name="paymentOption"
            items={paymentOptions}
            placeholder="მეთოდი"
            className="min-w-[160px]"
          />
          {/* Invoice */}
          <SelectField
            control={form.control}
            label="ზედნადები"
            name="needsInvoice"
            items={invoiceOptions}
            placeholder="კი/არა"
            className="min-w-[120px]"
          />
        </div>

        {/* Phone & email */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <InputField control={form.control} name="phone" label="ტელეფონი" type="phone" />
          <InputField control={form.control} name="email" label="ელ. ფოსტა" type="email" />
        </div>

        {/* Products */}
        <h2 className="col-span-full font-medium typo-label-md">პროდუქტები</h2>
        <ul className="flex flex-col gap-3">
          {/* Products list */}
          {fields.length ? (
            fields.map((field) => (
              <Fragment key={field.id}>
                <li className="flex h-9 items-center justify-between rounded-md border border-input px-3 typo-label-md">
                  <span>{field.title}</span>
                  <Button size={'icon'} variant={'ghost'} className="text-danger-500 " onClick={() => remove(field.id)}>
                    <Trash />
                  </Button>
                </li>
              </Fragment>
            ))
          ) : (
            <p className="typo-label-md">პროდუქტი არ არის არჩეული</p>
          )}
        </ul>

        {isSelectingProduct && <SelectProduct onSelect={onProductSelect} excludedProductCodes={selectedProductCodes} />}
        <div className="mt-4 flex w-full justify-end gap-2">
          <Button variant="ghost" size={'sm'} type="button" onClick={() => setIsSelectingProduct(true)}>
            <Plus />
            <span>დაამატე პროდუქტი</span>
          </Button>
        </div>

        <DrawerFooter className="col-span-full mt-8 flex justify-end gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? '...დამატება' : 'დამატება'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              გაუქმება
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
};
