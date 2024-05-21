import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
    trim: true,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    trim: true,
  },
  inStock: {
    type: Boolean,
    required: [true, 'inStock is required'],
    trim: true,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'Tags is required'],
    trim: true,
  },
  variants: {
    type: [variantsSchema],
    required: [true, 'Variants is required'],
    trim: true,
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory is required'],
    trim: true,
  },
});

export const ProductModel = model<TProduct>('Product', productSchema);
