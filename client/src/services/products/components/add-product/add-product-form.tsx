import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAddProduct } from '../../api';
import { Product, productDefaultValues, productSchema } from '../../schema';

import { Button, DrawerClose, DrawerFooter, Form, InputField, SelectField } from '@/components/ui';

type AddProductFormProps = {
  onProductAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddProductForm = ({ onProductAdd }: AddProductFormProps) => {
  const { mutate: addProduct, isPending } = useAddProduct({});

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
  });

  const onSubmit: SubmitHandler<Product> = (payload) => {
    addProduct(payload, {
      onSuccess: () => {
        onProductAdd((prev) => !prev);

        form.reset();
      },
    });
  };

  const onCancel = () => {
    form.reset();
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
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="grid gap-4">
        <div>
          <h2 className="mb-6 font-medium typo-label-md">ძირითადი ინფორმაცია</h2>

          <div className="flex items-center justify-between gap-3">
            {/* VAT */}
            <SelectField
              control={form.control}
              label="ზედნადები"
              name="shouldVAT"
              placeholder="კი/არა"
              items={vatOptions}
              className="min-w-[7.5rem]"
            />
            {/* Product code */}
            <InputField control={form.control} name="productCode" label="SKU" className="w-max" />
            {/* Title */}
            <InputField control={form.control} name="title" label="პროდუქტი" />
          </div>
        </div>
        {/* Prices */}

        <div>
          <h2 className="col-span-full my-6 font-medium typo-label-md">ფასები</h2>
          <div className="flex flex-wrap gap-3">
            <InputField control={form.control} name={'prices.TR1'} label="TR1" type="number" className="w-20" />
            <InputField control={form.control} name={'prices.TR2'} label="TR2" type="number" className="w-20" />
            <InputField control={form.control} name={'prices.TR3'} label="TR3" type="number" className="w-20" />
            <InputField control={form.control} name={'prices.TR4'} label="TR4" type="number" className="w-20" />
            <InputField control={form.control} name={'prices.TR5'} label="TR5" type="number" className="w-20" />
            <InputField control={form.control} name={'prices.TRD'} label="TRD" type="number" className="w-20" />
            <InputField control={form.control} name={'prices.TRC'} label="TRC" type="number" className="w-20" />
          </div>
        </div>
        <DrawerFooter className="col-span-full row-start-6 mt-2.5 justify-end gap-2">
          <Button type="submit">{isPending ? '...დამატება' : 'დამატება'}</Button>
          <DrawerClose asChild>
            <Button variant="outline" type="button" onClick={onCancel}>
              გაუქმება
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
};
