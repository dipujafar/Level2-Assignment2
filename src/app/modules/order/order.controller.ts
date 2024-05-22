import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await orderService.createOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
