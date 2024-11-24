import { productController } from '@/controllers';
import express from 'express';

const router = express.Router();

router.route('/products').get(async (req, res) => {
  await productController.getAllProducts(req, res);
});

router.route('/products/:id').get(async (req, res) => {
  await productController.getProduct(req, res);
});

router.route('/products').post(async (req, res) => {
  await productController.addProduct(req, res);
});

router.route('/products/:id').patch(async (req, res) => {
  await productController.updateProduct(req, res);
});

router.route('/products/:id').delete(async (req, res) => {
  await productController.deleteProduct(req, res);
});

export const productRoutes = router;
