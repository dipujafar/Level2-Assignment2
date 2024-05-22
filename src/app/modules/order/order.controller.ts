import { Request, Response } from 'express';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    //data validation vai zod
    const zodParseData = orderValidationSchema.parse(orderData);

    const result = await orderService.createOrderIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.issues[0]?.message || 'Something went wrong',
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await orderService.getOrderFromDB(email || '');

    res.status(200).json({
      success: true,
      message: `${email ? 'Orders fetched successfully for user email!' : 'Orders fetched successfully!'}`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const orderController = {
  createOrder,
  getOrder,
};
