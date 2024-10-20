import { Request, Response } from 'express';
import PropertyService from '../services/property.service';

class PropertyController {
  private service: PropertyService;

  constructor(service: PropertyService) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const properties = await this.service.getAll();
    res.status(200).json(properties);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const property = await this.service.getOne(id);
    res.status(200).json(property);
  }

  async create(req: Request, res: Response) {
    const newProperty = req.body;

    const response = await this.service.create(newProperty);
    res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    await this.service.update(id, data);
    res.status(200).json({ message: 'Property successfully updated!' });
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.remove(id);
    res.sendStatus(204);
  }
}

export default PropertyController;
