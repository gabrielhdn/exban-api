import { Request, Response } from 'express';
import ClientService from '../services/client.service';

class ClientController {
  private service;

  constructor(service: ClientService) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const clients = await this.service.getAll();
    res.status(200).json(clients);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const client = await this.service.getOne(id);
    res.status(200).json(client);
  }

  async create(req: Request, res: Response) {
    const newClient = req.body;

    const response = await this.service.create(newClient);
    res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    await this.service.update(id, data);
    res.status(200).json({ message: 'Client successfully updated!' });
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.remove(id);
    res.sendStatus(204);
  }
}

export default ClientController;
