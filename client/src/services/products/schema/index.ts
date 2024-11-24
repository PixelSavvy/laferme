import { z } from 'zod';

const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: 'სავალდებულოა' }),
  productCode: z.string().min(1, { message: 'სავალდებულოა' }),
  shouldVAT: z.enum(['0', '1', '']).refine((val) => val.length > 0, {
    message: 'სავალდებულოა',
  }),
  prices: z.object({
    TR1: z.coerce
      .number({
        required_error: 'სავალდებულო',
      })
      .multipleOf(0.01),
    TR2: z.coerce
      .number({
        required_error: 'სავალდებულო',
      })
      .multipleOf(0.01),
    TR3: z.coerce
      .number({
        required_error: 'სავალდებულო',
      })
      .multipleOf(0.01),
    TR4: z.coerce
      .number({
        required_error: 'სავალდებულო',
      })
      .multipleOf(0.01),
    TR5: z.coerce
      .number({
        required_error: 'სავალდებულო',
      })
      .multipleOf(0.01),
    TRD: z.coerce
      .number({
        required_error: 'სავალდებულო',
      })
      .multipleOf(0.01),
    TRC: z.coerce
      .number({
        required_error: 'სავალდებულო',
      })
      .multipleOf(0.01),
  }),
  price: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01)
    .optional(),
  weight: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .multipleOf(0.01)
    .optional(),
  quantity: z.coerce
    .number({
      required_error: 'სავალდებულო',
    })
    .optional(),
});

type Product = z.infer<typeof productSchema>;

const productDefaultValues: Product = {
  title: '',
  productCode: '',
  shouldVAT: '',
  prices: {
    TR1: 0,
    TR2: 0,
    TR3: 0,
    TR4: 0,
    TR5: 0,
    TRD: 0,
    TRC: 0,
  },
};

export { productDefaultValues, productSchema, type Product };
