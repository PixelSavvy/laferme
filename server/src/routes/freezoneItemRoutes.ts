import { freezoneItemController } from '@/controllers';
import express from 'express';

const router = express.Router();

router.route('/freezone-items').get(async (req, res) => {
  await freezoneItemController.getAllFreezoneItems(req, res);
});

router.route('/freezone-items/:id').patch(async (req, res) => {
  await freezoneItemController.updateFreezoneItem(req, res);
});

export const freezoneItemRoutes = router;
