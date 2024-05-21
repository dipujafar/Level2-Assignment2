import { z } from 'zod';

const variantsValidationSchema = z.object({
  type: z.string().trim().min(1, 'Variant type is required'),
  value: z.string().trim().min(1, 'Variant value is required'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be a non-negative number'),
  inStock: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'inStock is required',
  }),
});

const productValidationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a non-negative number'),
  category: z.string().trim().min(1, 'Category is required'),
  tags: z.array(z.string().trim().min(1, 'Tags is required')).min(1),
  variants: z.array(variantsValidationSchema).min(1, 'Variants is required'),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
