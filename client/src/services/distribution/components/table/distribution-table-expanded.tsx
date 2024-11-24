import { Button, Form, InputField } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from '@tanstack/react-table';
import { Save, Trash } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useUpdateDistributionItem } from '../../api';
import { Distribution, distributionSchema } from '../../schema';

export const DistributionTableExpanded = ({ row }: { row: Row<Distribution> }) => {
  const distributionitem = row.original;

  const { mutate: updateDistributionItem } = useUpdateDistributionItem({});

  const form = useForm<Distribution>({
    resolver: zodResolver(distributionSchema),
    defaultValues: distributionitem,
  });

  const { fields } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  const onSubmit: SubmitHandler<Distribution> = (payload) => {
    updateDistributionItem(
      { distributionItemId: distributionitem.id, data: payload },
      {
        onSuccess: () => {
          row.toggleExpanded();
          form.reset();
        },
      }
    );
  };

  const onCancel = () => {
    console.log('Reset Form State:', form.getValues());
    form.reset();
    row.toggleExpanded();
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="grid grid-cols-[max-content_1fr] gap-3">
        <ul className="flex flex-col justify-start items-start gap-2">
          {fields.map((field, index) => (
            <li key={field.id} className="flex items-start justify-start gap-3">
              <InputField
                name={`products.${index}.title`}
                label="პროდუქტი"
                type="text"
                disabled
                control={form.control}
                className="w-96"
              />
              <InputField
                name={`products.${index}.adjustedWeight`}
                label="წონა"
                type="number"
                disabled
                control={form.control}
                className="w-24"
              />
              <InputField
                name={`products.${index}.pricePerKilo`}
                label="ფასი"
                type="number"
                control={form.control}
                className="w-24"
              />
              <InputField
                name={`products.${index}.distributedWeight`}
                label="წონა*"
                type="number"
                control={form.control}
                className="w-24"
              />
            </li>
          ))}
        </ul>

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
