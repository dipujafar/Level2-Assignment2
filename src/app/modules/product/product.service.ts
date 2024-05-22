import { TProduct } from './product.interface';
import { ProductModel } from './product.model';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async (queryValue: any) => {
  const result = await ProductModel.find({
    name: { $regex: queryValue, $options: 'i' },
  });
  return result;
};

const getOneProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: new ObjectId(id) });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: new ObjectId(id) });
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getOneProductFromDB,
  deleteProductFromDB,
};
