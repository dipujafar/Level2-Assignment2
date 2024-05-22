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
      message: `${searchTerm ? "Products matching search term 'iphone' fetched successfully!" : 'Products fetched successfully!'}`,
      data: result,
    });
  } catch (error) {
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateProductData = req.body;

    const result = await productService.updateProductFromDB(
      productId,
      updateProductData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productService.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
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
  deleteProduct,
  updateProduct,
};
