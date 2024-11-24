import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import * as React from 'react';
import { useProducts } from '../../api';
import { Product } from '../../schema';

type SelectProductProps = {
  onSelect: (product: Product) => void;
  excludedProductCodes?: string[];
  placeholder?: string;
};

export const SelectProduct: React.FC<SelectProductProps> = ({
  onSelect,
  excludedProductCodes = [],
  placeholder = 'აირჩიე პროდუქტი',
}) => {
  const { data, isLoading, error } = useProducts({});
  const products = data?.data;

  // Handle loading and error states
  if (isLoading) {
    return <span className="text-neutral-700 typo-label-sm px-3">იტვირთება...</span>;
  }

  if (error) {
    return <span className="text-danger-500 typo-label-sm px-3">შეცდომა იტვირთება პროდუქტები</span>;
  }

  // Filter out excluded products
  const availableProducts = products?.filter((product) => !excludedProductCodes.includes(product.productCode));

  // Handle product selection
  const handleValueChange = (id: string) => {
    const selectedProduct = products?.find((product) => product.id?.toString() === id);
    if (selectedProduct) {
      onSelect(selectedProduct);
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="min-h-[0.625rem]">
        {/* min-h-10 → min-h-[0.625rem] */}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <SelectGroup>
          {availableProducts && availableProducts.length > 0 ? (
            availableProducts.map((product) => (
              <SelectItem key={product.id?.toString()} value={product.id!.toString()}>
                {product.title}
              </SelectItem>
            ))
          ) : (
            <span className="text-neutral-700 typo-label-sm px-3">პროდუქტი ვერ მოიძებნა</span>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
