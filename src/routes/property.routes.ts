import { Router } from 'express';
import PropertyController from '../controllers/property.controller';
import PropertyService from '../services/property.service';
import {
  validateAddress,
  validateValue,
} from '../middlewares/property.middleware';

const router = Router();

const propertyService = new PropertyService();
const propertyController = new PropertyController(propertyService);

router.get('/properties', propertyController.getAll.bind(propertyController));

router.get(
  '/properties/:id',
  propertyController.getOne.bind(propertyController),
);

router.post(
  '/properties',
  validateAddress,
  validateValue,
  propertyController.create.bind(propertyController),
);

router.put(
  '/properties/:id',
  validateAddress,
  validateValue,
  propertyController.update.bind(propertyController),
);

router.delete(
  '/properties/:id',
  propertyController.remove.bind(propertyController),
);

export default router;
