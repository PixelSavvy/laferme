import { useState } from 'react';

import { Plus } from 'lucide-react';

import { AddCustomerForm } from './add-customer-form';

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui';

export const AddCustomer = () => {
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
          <DrawerTitle>ახალი კლიენტის დამატება</DrawerTitle>
          <DrawerDescription className="opacity-0">Some description goes here.</DrawerDescription>
        </DrawerHeader>
        {/* App product Form */}
        <div className="size-full">
          <AddCustomerForm onCustomerAdd={setIsAdded} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
