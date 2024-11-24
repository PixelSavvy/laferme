import { orderController } from '@/controllers';
import express from 'express';

const router = express.Router();

router.route('/orders').get(async (req, res) => {
  await orderController.getAllOrders(req, res);
});

router.route('/orders').post(async (req, res) => {
  await orderController.addOrder(req, res);
});

router.route('/orders/:id').patch(async (req, res) => {
  await orderController.updateOrder(req, res);
});

export const orderRoutes = router;
