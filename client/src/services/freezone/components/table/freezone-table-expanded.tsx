import { Row } from '@tanstack/react-table';
import { Save, Trash } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { Freezone, freezoneSchema } from '../../schema';

import { Button, Form, InputField } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateFreezoneItem } from '../../api';

export const FreezoneTableExpanded = ({ row }: { row: Row<Freezone> }) => {
  const { mutate: updateFreezoneItem } = useUpdateFreezoneItem({});

  const freezoneItem = row.original;

  const form = useForm<Freezone>({
    resolver: zodResolver(freezoneSchema),
    defaultValues: freezoneItem,
  });

  const { fields } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  const onSubmit: SubmitHandler<Freezone> = (payload) => {
    updateFreezoneItem(
      { freezoneId: payload.id!, data: payload },
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

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="grid grid-cols-[max-content_1fr] gap-3">
        <div className="flex flex-col">
          <h2 className="mb-6 font-medium typo-paragraph-md">პროდუქტები</h2>

          {/* Prepopulated Data */}
          <ul className="flex flex-col justify-start items-start gap-2">
            {fields.map((field, index) => (
              <li className="flex items-start justify-start gap-3" key={field.id}>
                <InputField
                  name={`products.${index}.productCode`}
                  label="SKU"
                  disabled
                  control={form.control}
                  className="max-w-16"
                  type="text"
                />
                <InputField
                  name={`products.${index}.title`}
                  label="პროდუქტი"
                  disabled
                  control={form.control}
                  className="w-80"
                  type="text"
                />
                <InputField
                  control={form.control}
                  name={`products.${index}.weight`}
                  type="number"
                  label="წონა"
                  className="w-24"
                  disabled
                />
                <InputField
                  control={form.control}
                  name={`products.${index}.quantity`}
                  type="number"
                  label="რაოდენობა"
                  className="w-24"
                  disabled
                />

                {/* Freezone input */}
                <InputField
                  control={form.control}
                  label="წონა*"
                  name={`products.${index}.adjustedWeight`}
                  className="w-24"
                  type="number"
                />
                <InputField
                  control={form.control}
                  label="რაოდენობა*"
                  name={`products.${index}.adjustedQuantity`}
                  className="w-24"
                  type="number"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-full mt-8 flex justify-end gap-2">
          <Button type="submit">
            <Save />
            <span>შენახვა</span>
          </Button>
          <Button variant={'danger'} onClick={onCancel}>
            <Trash />
            <span>გაუქმება</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
