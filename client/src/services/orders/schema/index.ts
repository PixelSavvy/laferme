import { z } from 'zod';

const orderProductsSchema = z.object({
  id: z.number(),
  productCode: z.string(),
  title: z.string(),
  price: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01),
  weight: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01),
  quantity: z.coerce.number({
    required_error: 'სავალდებულო',
  }),
});

const newOrderSchema = z.object({
  customerId: z.number(),
  products: z.array(orderProductsSchema),
  status: z.enum(['TODELIVER', 'DELIVERED', 'RETURNED', 'PREPARING', 'PREPARED', 'CANCELLED', 'READYTODELIVER']),
});

const orderSchema = z.object({
  id: z.number(),
  customer: z.object({
    id: z.number(),
    name: z.string(),
    priceIndex: z.string(),
    needsInvoice: z.enum(['0', '1']),
  }),
  products: z.array(orderProductsSchema),
  status: z.enum(['TODELIVER', 'DELIVERED', 'RETURNED', 'PREPARING', 'PREPARED', 'CANCELLED', 'READYTODELIVER']),
  createdAt: z.string(),
});

type Order = z.infer<typeof orderSchema>;

type NewOrder = z.infer<typeof newOrderSchema>;

type OrderProduct = z.infer<typeof orderProductsSchema>;

const orderDefaultValues: Order = {
  id: 0,
  customer: {
    id: 0,
    name: '',
    priceIndex: '',
    needsInvoice: '0',
  },
  products: [
    {
      id: 0,
      productCode: '',
      title: '',
      price: 0,
      quantity: 0,
      weight: 0,
    },
  ],
  status: 'PREPARING',
  createdAt: '',
};

const newOrderDefaultValues: NewOrder = {
  customerId: 0,
  products: [
    {
      id: 0,
      productCode: '',
      title: '',
      price: 0,
      quantity: 0,
      weight: 0,
    },
  ],
  status: 'PREPARING',
};

export {
  newOrderDefaultValues,
  newOrderSchema,
  orderDefaultValues,
  orderProductsSchema,
  orderSchema,
  type NewOrder,
  type Order,
  type OrderProduct,
};
