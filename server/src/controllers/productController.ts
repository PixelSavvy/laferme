import { Product } from '@/models';
import { sendResponse } from '@/utils';
import { Request, Response } from 'express';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();

    if (products.length === 0) {
      return sendResponse(res, 200, 'პროდუქტები ვერ მოიძებნა', []);
    }

    return sendResponse(res, 200, 'პროდუქტები წარმატებით მოიძებნა!', products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return sendResponse(res, 500, 'Failed to fetch products.');
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return sendResponse(res, 200, 'პროდუქტი მსგავსი id-ით ვერ მოიძებნება.');
    }

    return sendResponse(res, 200, 'პროდუქტი წარმატებით მოიძებნა!', product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return sendResponse(res, 500, 'Failed to fetch the product.');
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { title, productCode, prices, shouldVAT } = req.body;

    if (!title || !productCode || !prices || typeof shouldVAT === 'undefined') {
      return sendResponse(res, 400, 'სათაური, პროდუქტის კოდი, ფასი და დღგ სავალდებულოა.');
    }

    const existingProduct = await Product.findOne({ where: { productCode } });

    if (existingProduct) {
      return sendResponse(res, 200, 'პროდუქტი მსგავსი პროდუქტის კოდით უკვე არსებობს.');
    }

    const newProduct = await Product.create({ title, productCode, prices, shouldVAT });

    return sendResponse(res, 201, 'პროდუქტი წარმატებით დაემატა!', newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    return sendResponse(res, 500, 'Failed to add the product.');
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, productCode, prices, shouldVAT } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return sendResponse(res, 200, 'პროდუქტი ვერ მოიძებნა.');
    }

    if (productCode && productCode !== product.productCode) {
      const codeExists = await Product.findOne({ where: { productCode } });
      if (codeExists) {
        return sendResponse(res, 200, 'პროდუქტის ახალი კოდი უკვე არსებობს.');
      }
    }

    await product.update({ title, productCode, prices, shouldVAT });

    return sendResponse(res, 200, 'პროდუქტი წარმატებით შეიცვალა.', product);
  } catch (error) {
    console.error('Error updating product:', error);
    return sendResponse(res, 500, 'Failed to update the product.');
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return sendResponse(res, 200, 'პროდუქტი ვერ მოიძებნა.');
    }

    await product.destroy();

    return sendResponse(res, 200, 'პროდუქტი წარმატებით წაიშალა.');
  } catch (error) {
    console.error('Error deleting product:', error);
    return sendResponse(res, 500, 'Failed to delete the product.');
  }
};

export const productController = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
