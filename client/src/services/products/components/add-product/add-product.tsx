import { useState } from 'react';

import { Plus } from 'lucide-react';

import { AddProductForm } from './add-product-form';

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui';

export const AddProduct = () => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <Drawer direction="right" open={isAdded} onOpenChange={setIsAdded}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          <span>დაამატე</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="typo-paragraph-lg">ახალი პროდუქტის დამატება</DrawerTitle>
          <DrawerDescription className="opacity-0">Some description goes here.</DrawerDescription>
        </DrawerHeader>
        {/* App product Form */}
        <div className="size-full">
          <AddProductForm onProductAdd={setIsAdded} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
