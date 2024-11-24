import { z } from 'zod';

const freezoneProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  productCode: z.string(),
  weight: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01),
  quantity: z.coerce.number({
    required_error: 'სავალდებულო',
  }),

  adjustedWeight: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01),

  adjustedQuantity: z.coerce.number({
    required_error: 'სავალდებულო',
  }),
});

const freezoneSchema = z.object({
  id: z.number(),
  customer: z.object({
    id: z.number(),
    name: z.string(),
    priceIndex: z.string(),
    needsInvoice: z.enum(['0', '1']),
  }),
  orderId: z.number(),
  products: z.array(freezoneProductSchema),
  status: z.enum(['TODELIVER', 'DELIVERED', 'RETURNED', 'PREPARING', 'PREPARED', 'CANCELLED', 'READYTODELIVER']),
  createdAt: z.string(),
});

type Freezone = z.infer<typeof freezoneSchema>;

const freezoneDefaultValues: Freezone = {
  id: 0,
  customer: {
    id: 0,
    name: '',
    priceIndex: '',
    needsInvoice: '0',
  },
  orderId: 0,
  products: [
    {
      id: 0,
      title: '',
      productCode: '',
      quantity: 0,
      weight: 0,
      adjustedWeight: 0,
      adjustedQuantity: 0,
    },
  ],
  status: 'PREPARING',
  createdAt: '',
};

export { freezoneDefaultValues, freezoneProductSchema, freezoneSchema, type Freezone };
