import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { NewOrder, newOrderDefaultValues, newOrderSchema, OrderProduct } from '../../schema';
import { useOrderStore } from '../../store';

import { Button, DrawerClose, DrawerFooter, Form, InputField } from '@/components/ui';
import { SelectCustomer } from '@/services/customers/components';
import { Customer } from '@/services/customers/schema';
import { Product } from '@/services/products';
import { SelectProduct } from '@/services/products/components';
import { useAddOrder } from '../../api';

type AddOrderFormProps = {
  onOrderAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddOrderForm: React.FC<AddOrderFormProps> = ({ onOrderAdd }) => {
  const [isProductSelectorVisible, setProductSelectorVisible] = useState(false);
  const [isCustomerSelected, setCustomerSelected] = useState(true);

  const { mutate: addOrder } = useAddOrder({});
  const { setCustomer, setProducts, order } = useOrderStore();

  const form = useForm<NewOrder>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: newOrderDefaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove, replace } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  useEffect(() => {
    form.setValue('products', order?.products ?? []);
  }, [order?.products, form]);

  const onCustomerSelect = (customer: Customer) => {
    const customerProducts = customer.products || [];

    const transformedProducts = customerProducts.map((product) => ({
      id: product.id!,
      productCode: product.productCode,
      title: product.title,
      price: product.prices[customer.priceIndex],
      weight: 0,
      quantity: 0,
    }));

    setCustomer(customer);
    setProducts(transformedProducts);

    form.setValue('customerId', customer.id!);
    replace(transformedProducts);
    setCustomerSelected(false);
  };

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

  const onSubmit: SubmitHandler<NewOrder> = (payload) => {
    console.log(payload);
    addOrder(payload);
    onOrderAdd((prev) => !prev);
    form.reset();
    setCustomerSelected(true);
  };

  const onCancel = () => {
    form.reset();
    setCustomerSelected(true);
    setProductSelectorVisible(false);
  };

  const selectedProductCodes = fields.map((field) => field.productCode);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-w-[48rem] flex-col gap-3">
        <div className="flex flex-col gap-3">
          <h2 className="mb-6 font-medium typo-paragraph-md">პროდუქტები</h2>
          {/* Customer Select */}
          {isCustomerSelected ? (
            <SelectCustomer onChange={onCustomerSelect} />
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="flex flex-col rounded-md border p-2">
                <div className="flex items-center justify-between gap-3">
                  <InputField
                    control={form.control}
                    name={`products.${index}.productCode`}
                    label="SKU"
                    disabled
                    className="max-w-20"
                  />
                  <InputField
                    control={form.control}
                    name={`products.${index}.title`}
                    label="პროდუქტი"
                    disabled
                    className="min-w-5rem"
                  />
                  <InputField
                    control={form.control}
                    name={`products.${index}.price`}
                    label="ფასი"
                    type="number"
                    className="max-w-20"
                  />
                  <InputField
                    control={form.control}
                    name={`products.${index}.quantity`}
                    label="რაოდენობა"
                    type="number"
                    className="max-w-20"
                  />
                  <InputField
                    control={form.control}
                    name={`products.${index}.weight`}
                    label="წონა"
                    type="number"
                    className="max-w-20"
                  />
                </div>
                <div className="flex w-full justify-end">
                  <Button variant="danger" size="icon" type="button" onClick={() => remove(index)}>
                    <Trash />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Product Selector */}
        {isProductSelectorVisible && (
          <div className="mt-4">
            <SelectProduct onSelect={onProductSelect} excludedProductCodes={selectedProductCodes} />
          </div>
        )}

        {/* Add Product Button */}
        {!isProductSelectorVisible && !isCustomerSelected && (
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => setProductSelectorVisible(true)}>
              <Plus />
              <span>დაამატე პროდუქტი</span>
            </Button>
          </div>
        )}

        {/* Drawer Footer */}
        <DrawerFooter className="mt-10 flex w-full justify-end gap-2">
          <Button type="submit">
            <span>დაამატე შეკვეთა</span>
          </Button>
          <DrawerClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              გაუქმება
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
};
