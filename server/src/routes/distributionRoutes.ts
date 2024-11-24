import { distributionController } from '@/controllers';
import express from 'express';

const router = express.Router();

router.route('/distribution').get(async (req, res) => {
  await distributionController.getAllDistributionItems(req, res);
});
router.route('/distribution/:id').patch(async (req, res) => {
  await distributionController.updateDistributionItem(req, res);
});

export const distributionItemRoutes = router;
