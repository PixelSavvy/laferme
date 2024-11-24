import { Fragment, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from '@tanstack/react-table';
import { Plus, Save, Trash } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useDeleteCustomer, useUpdateCustomer } from '../../api';
import { Customer, customerSchema } from '../../schema';

import { Button, Form, InputField, SelectField } from '@/components/ui';
import { Product, SelectProduct } from '@/services/products';

export const CustomerTableExpanded = ({ row }: { row: Row<Customer> }) => {
  const customer = row.original;

  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  const { mutate: updateCustomer } = useUpdateCustomer({});
  const { mutate: deleteCustomer } = useDeleteCustomer({});

  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      ...customer,
    },
  });

  const { fields, remove, prepend } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  const invoiceOptions = useMemo(
    () => [
      { label: 'კი', value: '1' },
      { label: 'არა', value: '0' },
    ],
    []
  );

  const paymentOptions = useMemo(
    () => [
      { label: 'ქეში', value: 'CASH' },
      { label: 'ტრანსფერი', value: 'TRANSFER' },
      { label: 'კონსიგნაცია', value: 'CONSIGNMENT' },
      { label: 'სატესტო', value: 'TRIAL' },
      { label: 'ფასდაკლებული', value: 'DISCOUNTED' },
    ],
    []
  );

  const priceIndexes = useMemo(
    () => [
      { label: 'TR1', value: 'TR1' },
      { label: 'TR2', value: 'TR2' },
      { label: 'TR3', value: 'TR3' },
      { label: 'TR4', value: 'TR4' },
      { label: 'TR5', value: 'TR5' },
      { label: 'TRD', value: 'TRD' },
      { label: 'TRC', value: 'TRC' },
    ],
    []
  );

  const onProductSelect = (val: Product) => {
    prepend(val);
    setIsSelectingProduct((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Customer> = (payload) => {
    const updatedPayload = {
      ...payload,
    };

    updateCustomer(
      {
        data: updatedPayload,
        customerId: customer.id!,
      },
      {
        onSuccess: () => {
          row.toggleExpanded();
          form.reset();
        },
      }
    );
  };

  const onDelete = () => {
    deleteCustomer(
      { customerId: customer.id! },
      {
        onSuccess: () => {
          row.toggleExpanded();
        },
      }
    );
  };

  const selectedProductCodes = fields.map((field) => field.productCode);

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="">
        <div className="flex justify-start items-start gap-16">
          {/* General details */}
          <div>
            <div className="col-start-1 flex flex-col items-start justify-start gap-3">
              <h2 className="mb-2 font-medium typo-paragraph-md">ძირითადი ინფორმაცია</h2>
              {/* Form Fields */}
              <InputField control={form.control} name="name" label="სახელი" type="text" className="w-[32rem]" />
            </div>
            <div className="col-start-1 flex items-center justify-start gap-3 w-full">
              <SelectField
                control={form.control}
                label="საფასო ინდექსი"
                name="priceIndex"
                items={priceIndexes}
                placeholder="ინდექსი"
              />

              <SelectField
                control={form.control}
                label="გადახდის მეთოდი"
                name="paymentOption"
                items={paymentOptions}
                placeholder="მეთოდი"
                className="min-w-64"
              />
              <SelectField
                control={form.control}
                label="ზედნადები"
                name="needsInvoice"
                items={invoiceOptions}
                placeholder="კი/არა"
                className="min-w-[7.2rem]"
              />
            </div>

            <div className="col-start-1 flex items-center justify-start gap-3">
              <InputField control={form.control} name="phone" label="ტელეფონი" type="phone" className="" />
              <InputField control={form.control} name="email" label="ელ.ფოსტა" type="email" className="" />
            </div>
          </div>
          {/* Products */}
          <div className="flex flex-col items-start justify-start gap-3 flex-1">
            <h2 className="mb-[31px] font-medium typo-paragraph-md">პროდუქტები</h2>

            <ul className="space-y-4 mb-1">
              {fields.length > 0 ? (
                fields.map((product) => (
                  <Fragment key={product.id}>
                    <li className="flex h-9 items-center justify-between rounded-md border border-input px-3 typo-label-md w-80">
                      <span>{product.title}</span>
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        className="text-danger-500 size-6"
                        onClick={() => remove(product.id)}
                        type="button"
                      >
                        <Trash />
                      </Button>
                    </li>
                  </Fragment>
                ))
              ) : (
                <p>პროდუქტები არ არის არჩეული</p>
              )}
            </ul>

            {isSelectingProduct && <SelectProduct excludedProductCodes={selectedProductCodes} onSelect={onProductSelect} />}
            <div>
              <Button variant="ghost" type="button" onClick={() => setIsSelectingProduct(true)}>
                <Plus />
                <span>დაამატე პროდუქტი</span>
              </Button>
            </div>
          </div>
        </div>
        {/* Save and Delete Buttons */}
        <div className="flex gap-2 w-full justify-end">
          <Button type="submit">
            <Save />
            <span>შენახვა</span>
          </Button>
          <Button variant="danger" onClick={onDelete}>
            წაშლა
          </Button>
        </div>
      </form>
    </Form>
  );
};
