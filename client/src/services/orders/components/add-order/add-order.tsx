import { useState } from 'react';

import { Plus } from 'lucide-react';

import { AddOrderForm } from './add-order-form';

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui';

export const AddOrder = () => {
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
          <DrawerTitle>ახალი შეკვეთის დამატება</DrawerTitle>
          <DrawerDescription className="opacity-0">Some description goes here.</DrawerDescription>
        </DrawerHeader>
        {/* App product Form */}
        <div className="size-full">
          <AddOrderForm onOrderAdd={setIsAdded} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
