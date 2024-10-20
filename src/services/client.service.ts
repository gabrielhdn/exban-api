import { Client, Deal, Property } from '../database/models';
import { CreateClientDto } from '../dto/client.dto';
import { IError } from '../interfaces/error.interface';

class ClientService {
  private model = Client;

  async getAll(): Promise<Client[]> {
    const clients = this.model.findAll({
      include: [
        {
          model: Property,
          as: 'properties',
        },
        {
          model: Deal,
          as: 'deals',
        },
      ],
    });

    return clients;
  }

  async getOne(id: string): Promise<Client | null> {
    const client = await this.model.findByPk(id, {
      include: [
        {
          model: Property,
          as: 'properties',
        },
        {
          model: Deal,
          as: 'deals',
        },
      ],
    });

    if (!client) {
      const error = {
        status: 404,
        message: "We couldn't find this client.",
      };

      throw error as IError;
    }

    return client;
  }

  async create(data: CreateClientDto): Promise<Client | null> {
    const { name, email, fiscalIdentifier } = data;
    const client = await this.model.findOne({ where: { fiscalIdentifier } });

    if (client) {
      const error = {
        status: 400,
        message: 'This CPF was already registered.',
      };

      throw error as IError;
    }

    const newClient = await this.model.create({
      name,
      email,
      fiscalIdentifier,
    });

    return newClient;
  }

  async update(id: string, data: Partial<CreateClientDto>): Promise<void> {
    await this.getOne(id);
    await this.model.update({ ...data }, { where: { id } });
  }

  async remove(id: string) {
    await this.model.destroy({ where: { id } });
  }
}

export default ClientService;
