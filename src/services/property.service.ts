import { Client, Deal, Property } from '../database/models';
import { CreatePropertyDto } from '../dto/property.dto';
import { IError } from '../interfaces/error.interface';
import ClientService from './client.service';

class PropertyService {
  private model = Property;
  private clientService = new ClientService();

  async getAll(): Promise<Property[]> {
    const clients = this.model.findAll({
      include: [
        {
          model: Client,
          as: 'client',
        },
        {
          model: Deal,
          as: 'deals',
        },
      ],
    });

    return clients;
  }

  async getOne(id: string): Promise<Property | null> {
    const property = await this.model.findByPk(id, {
      include: [
        {
          model: Client,
          as: 'client',
        },
        {
          model: Deal,
          as: 'deals',
        },
      ],
    });

    if (!property) {
      const error = {
        status: 404,
        message: "We couldn't find this property.",
      };

      throw error as IError;
    }

    return property;
  }

  async create(data: CreatePropertyDto): Promise<Property | null> {
    const { address, clientId, value } = data;
    await this.clientService.getOne(clientId);

    const newProperty = await this.model.create({ address, clientId, value });
    return newProperty;
  }

  async update(id: string, data: Partial<CreatePropertyDto>): Promise<void> {
    await this.getOne(id);

    if (data.clientId) {
      await this.clientService.getOne(data.clientId);
    }

    await this.model.update({ ...data }, { where: { id } });
  }

  async remove(id: string) {
    await this.model.destroy({ where: { id } });
  }
}

export default PropertyService;
