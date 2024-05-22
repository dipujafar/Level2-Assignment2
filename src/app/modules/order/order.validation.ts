import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .trim()
    .min(1, { message: 'Email is required' }),
  productId: z.string().trim().min(1, { message: 'ProductId is required' }),
  price: z.number().min(1, { message: 'Price is required' }),
  quantity: z.number().min(1, { message: 'Quantity is required' }),
});

export default orderValidationSchema;
