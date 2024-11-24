import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from '@tanstack/react-table';
import { Save } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useDeleteProduct, useUpdateProduct } from '../../api';
import { Product, productSchema } from '../../schema';

import { Button, Form, InputField, SelectField } from '@/components/ui';

export const ProductTableExpanded = ({ row }: { row: Row<Product> }) => {
  const product = row.original;

  const { mutate: updateProduct } = useUpdateProduct({});
  const { mutate: deleteProduct } = useDeleteProduct({});

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Product> = (payload) => {
    const updatedPayload = { ...payload, id: product.id };

    updateProduct(
      { data: updatedPayload, productId: product.id! },
      {
        onSuccess: () => {
          row.toggleExpanded();
          form.reset();
        },
      }
    );
  };

  const onDelete = () => {
    deleteProduct(
      { productId: product.id! },
      {
        onSuccess: () => {
          row.toggleExpanded();
        },
      }
    );
  };

  const vatOptions = useMemo(
    () => [
      { label: 'კი', value: '1' },
      { label: 'არა', value: '0' },
    ],
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="grid grid-cols-2 gap-x-10 gap-y-6">
        {/* General details */}
        <div>
          <h2 className="mb-6 font-medium typo-paragraph-md">ძირითადი ინფორმაცია</h2>
          <div className="flex items-center justify-between gap-3">
            {/* Product Code and Title */}
            <InputField control={form.control} name="productCode" label="SKU" className="w-20" />
            {/* VAT */}
            <SelectField control={form.control} label="ზედნადები" name="shouldVAT" items={vatOptions} />
            <InputField control={form.control} name="title" label="პროდუქტი" className="" />
          </div>
        </div>

        {/* Prices Section */}
        <div className="">
          <h2 className="mb-6 font-medium typo-paragraph-md">ფასები</h2>
          <div className="flex justify-between gap-3">
            <InputField control={form.control} name={'prices.TR1'} label="TR1" type="number" />
            <InputField control={form.control} name={'prices.TR2'} label="TR2" type="number" />
            <InputField control={form.control} name={'prices.TR3'} label="TR3" type="number" />
            <InputField control={form.control} name={'prices.TR4'} label="TR4" type="number" />
            <InputField control={form.control} name={'prices.TR5'} label="TR5" type="number" />
            <InputField control={form.control} name={'prices.TRD'} label="TRD" type="number" />
            <InputField control={form.control} name={'prices.TRC'} label="TRC" type="number" />
          </div>
        </div>

        {/* Save and Delete Buttons */}
        <div className="col-span-full ml-auto flex gap-2">
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
