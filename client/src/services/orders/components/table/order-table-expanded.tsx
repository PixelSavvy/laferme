import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from '@tanstack/react-table';
import { Plus, Save, Trash } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { Order, OrderProduct, orderSchema } from '../../schema';

import { Button, Form, InputField } from '@/components/ui';
import { Product, SelectProduct } from '@/services/products';
import { useState } from 'react';
import { useUpdateOrder } from '../../api';

export const OrderTableExpanded = ({ row }: { row: Row<Order> }) => {
  const [isProductSelectorVisible, setProductSelectorVisible] = useState(false);

  const { mutate: updateOrder } = useUpdateOrder({});

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: { ...row.original },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  const onProductSelect = (product: Product) => {
    const transformedProduct: OrderProduct = {
      id: product.id!,
      productCode: product.productCode,
      title: product.title,
      price: 0,
      weight: 0,
      quantity: 0,
    };
    append(transformedProduct);
    setProductSelectorVisible(false);
  };

  const onSubmit: SubmitHandler<Order> = (payload) => {
    updateOrder(
      { orderId: payload.id, data: payload.products },
      {
        onSuccess: () => {
          row.toggleExpanded();
          form.reset();
        },
      }
    );
  };

  const onCancel = () => {
    form.reset();
    row.toggleExpanded();
  };

  const selectedProductCodes = fields.map((field) => field.productCode);

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="grid grid-cols-[max-content_1fr] gap-3">
        <div className="flex flex-col">
          <h2 className="mb-6 font-medium typo-paragraph-md">პროდუქტები</h2>

          <ul className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <li className="flex items-start justify-start gap-3" key={field.id}>
                <InputField
                  name={`products.${index}.productCode`}
                  label="SKU"
                  control={form.control}
                  className="max-w-16"
                  disabled
                />
                <InputField
                  name={`products.${index}.title`}
                  label="პროდუქტი"
                  control={form.control}
                  className="w-80"
                  disabled
                />
                <InputField
                  control={form.control}
                  name={`products.${index}.price`}
                  type="number"
                  label="ფასი"
                  className="w-24"
                />
                <InputField
                  control={form.control}
                  name={`products.${index}.weight`}
                  type="number"
                  label="წონა"
                  className="w-24"
                />
                <InputField
                  control={form.control}
                  name={`products.${index}.quantity`}
                  type="number"
                  label="რაოდენობა"
                  className="w-24"
                />
                <Button variant="danger" size="icon" type="button" onClick={() => remove(index)} className="mt-6">
                  <Trash />
                </Button>
              </li>
            ))}
          </ul>

          {isProductSelectorVisible && (
            <div className="mt-3">
              <SelectProduct excludedProductCodes={selectedProductCodes} onSelect={onProductSelect} />
            </div>
          )}

          <div className="mt-3">
            <Button variant="ghost" type="button" onClick={() => setProductSelectorVisible(true)}>
              <Plus />
              <span>დაამატე პროდუქტი</span>
            </Button>
          </div>
        </div>

        <div className="col-span-full mt-8 flex justify-end gap-2">
          <Button type="submit">
            <Save />
            <span>შენახვა</span>
          </Button>
          <Button type="button" variant="danger" onClick={onCancel}>
            <Trash />
            <span>გაუქმება</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
