import { Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    //data validation vai zod
    const zodParseData = productValidationSchema.parse(productData);

    const result = await productService.createProductIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await productService.getAllProductFromDB(searchTerm || '');

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getOneProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getOneProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const productController = {
  createProduct,
  getProducts,
  getOneProducts,
};
