import { customerSchema } from '@/services/customers/schema';
import { z } from 'zod';

const distributionProductSchema = z.object({
  title: z.string(),
  pricePerKilo: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01),
  adjustedWeight: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01),
  distributedWeight: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01),

  totalPrice: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01)
    .optional(),
});

const distributionSchema = z.object({
  id: z.number(),
  customer: customerSchema.pick({
    id: true,
    name: true,
    paymentOption: true,
    needsInvoice: true,
  }),
  products: z.array(distributionProductSchema),
  status: z.enum(['TODELIVER', 'DELIVERED', 'RETURNED', 'PREPARING', 'PREPARED', 'CANCELLED', 'READYTODELIVER']),
  distributedAt: z.string().optional(),
  createdAt: z.string(),
});

type Distribution = z.infer<typeof distributionSchema>;

const distributionDefaultValues: Distribution = {
  id: 0,
  customer: {
    id: 0,
    name: '',
    paymentOption: 'CASH',
    needsInvoice: '0',
  },
  products: [
    {
      title: '',
      adjustedWeight: 0,
      distributedWeight: 0,
      pricePerKilo: 0,
      totalPrice: 0,
    },
  ],
  status: 'PREPARING',
  createdAt: '',
};

export { distributionDefaultValues, distributionProductSchema, distributionSchema, type Distribution };
