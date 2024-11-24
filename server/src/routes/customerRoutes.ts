import { customerController } from '@/controllers';
import express from 'express';

const router = express.Router();

router.route('/customers').get(async (req, res) => {
  await customerController.getAllCustomers(req, res);
});

router.route('/customers/:id').get(async (req, res) => {
  await customerController.getCustomer(req, res);
});

router.route('/customers').post(async (req, res) => {
  await customerController.addCustomer(req, res);
});

router.route('/customers/:id').patch(async (req, res) => {
  await customerController.updateCustomer(req, res);
});

router.route('/customers/:id').delete(async (req, res) => {
  await customerController.deleteCustomer(req, res);
});

export const customerRoutes = router;
