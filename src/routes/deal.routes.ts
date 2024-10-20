import { Router } from 'express';
import DealService from '../services/deal.service';
import DealController from '../controllers/deal.controller';
import { validateIssueDate } from '../middlewares/deal.middleware';

const router = Router();

const dealService = new DealService();
const dealController = new DealController(dealService);

router.get('/deals', dealController.getAll.bind(dealController));

router.get('/deals/:id', dealController.getOne.bind(dealController));

router.post(
  '/deals',
  validateIssueDate,
  dealController.create.bind(dealController),
);

router.put(
  '/deals/:id',
  validateIssueDate,
  dealController.update.bind(dealController),
);

router.delete('/deals/:id', dealController.remove.bind(dealController));

export default router;
