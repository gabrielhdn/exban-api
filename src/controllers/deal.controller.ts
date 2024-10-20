import { Request, Response } from 'express';
import DealService from '../services/deal.service';

class DealController {
  private service: DealService;

  constructor(service: DealService) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const deals = await this.service.getAll();
    res.status(200).json(deals);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const deal = await this.service.getOne(id);
    res.status(200).json(deal);
  }

  async create(req: Request, res: Response) {
    const newDeal = req.body;

    const response = await this.service.create(newDeal);
    res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    await this.service.update(id, data);
    res.status(200).json({ message: 'Deal successfully updated!' });
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.remove(id);
    res.sendStatus(204);
  }
}

export default DealController;
