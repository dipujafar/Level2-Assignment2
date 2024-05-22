import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
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
