import { Router } from 'express';
import ClientController from '../controllers/client.controller';
import ClientService from '../services/client.service';
import { validateCPF, validateEmail } from '../middlewares/client.middleware';

const router = Router();

const clientService = new ClientService();
const clientController = new ClientController(clientService);

router.get('/clients', clientController.getAll.bind(clientController));

router.get('/clients/:id', clientController.getOne.bind(clientController));

router.post(
  '/clients',
  validateCPF,
  validateEmail,
  clientController.create.bind(clientController),
);

router.put(
  '/clients/:id',
  validateCPF,
  validateEmail,
  clientController.update.bind(clientController),
);

router.delete('/clients/:id', clientController.remove.bind(clientController));

export default router;
