import { productSchema } from '@/services/products';
import { formatNumber } from '@/utils';
import { z } from 'zod';

const customerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'სავალდებულოა' }),
  priceIndex: z.enum(['TR1', 'TR2', 'TR3', 'TR4', 'TR5', 'TRD', 'TRC']).refine((val) => val.length > 0, {
    message: 'სავალდებულოა',
  }),
  paymentOption: z.enum(['CASH', 'TRANSFER', 'CONSIGNMENT', 'TRIAL', 'DISCOUNTED']).refine((val) => val.length > 0, {
    message: 'სავალდებულოა',
  }),
  phone: z
    .string()
    .min(1, { message: 'სავალდებულოა' })
    .transform((val) => formatNumber(val)),
  email: z
    .string()
    .email({
      message: 'სავალდებულოა',
    })
    .min(1, { message: 'სავალდებულოა' }),
  needsInvoice: z.enum(['0', '1']).refine((val) => val.length > 0, {
    message: 'სავალდებულოა',
  }),
  products: z.array(productSchema),
});

type Customer = z.infer<typeof customerSchema>;

const customerDefaultValues: Customer = {
  name: '',
  priceIndex: 'TR1',
  paymentOption: 'CASH',
  products: [],
  phone: '',
  email: '',
  needsInvoice: '0',
};

export { customerDefaultValues, customerSchema, type Customer };
