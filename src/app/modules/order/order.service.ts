import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const createOrderIntoDB = async (order: TOrder) => {
  // check order is existing in product collect
  const isExist = await ProductModel.findOne({
    $and: [
      { _id: new ObjectId(order.productId) },
      { 'inventory.inStock': true },
    ],
  });

  if (!isExist) {
    throw new Error('This product is not exist in product collection');
  }
  console.log(isExist);
  const result = await OrderModel.create(order);
  return result;
};

const getOrderFromDB = async (queryValue: any) => {
  const result = await OrderModel.find({
    email: { $regex: queryValue, $options: 'i' },
  });
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getOrderFromDB,
};
