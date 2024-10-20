import { Client, Deal, Property } from '../database/models';
import { CreateDealDto } from '../dto/deal.dto';
import { IError } from '../interfaces/error.interface';
import ClientService from './client.service';
import PropertyService from './property.service';

class DealService {
  private model = Deal;
  private clientService = new ClientService();
  private propertyService = new PropertyService();

  async getAll(): Promise<Deal[]> {
    const deals = this.model.findAll({
      include: [
        {
          model: Client,
          as: 'client',
        },
        {
          model: Property,
          as: 'property',
        },
      ],
    });

    return deals;
  }

  async getOne(id: string): Promise<Deal | null> {
    const deal = await this.model.findByPk(id, {
      include: [
        {
          model: Client,
          as: 'client',
        },
        {
          model: Property,
          as: 'property',
        },
      ],
    });

    if (!deal) {
      const error = {
        status: 404,
        message: "We couldn't find this deal.",
      };

      throw error as IError;
    }

    return deal;
  }

  async create(data: CreateDealDto): Promise<Deal | null> {
    const { clientId, propertyId, value, issueDate } = data;

    await this.clientService.getOne(clientId);
    const property = await this.propertyService.getOne(propertyId);
    this.verifyDealValue(value, +property!.value);

    const newDeal = await this.model.create({
      clientId,
      propertyId,
      value,
      issueDate,
    });

    return newDeal;
  }

  async update(id: string, data: Partial<CreateDealDto>): Promise<void> {
    await this.getOne(id);
    await this.model.update({ ...data }, { where: { id } });
  }

  async remove(id: string) {
    await this.model.destroy({ where: { id } });
  }

  private verifyDealValue(dealValue: number, propertyValue: number) {
    const error = {
      status: 400,
      message: '',
    };

    if (dealValue > propertyValue) {
      error.message = "Deal value cannot exceed it's property value.";
      throw error as IError;
    }

    const maxDealValue = propertyValue * 0.8;

    if (dealValue > maxDealValue) {
      error.message = 'Deal value cannot exceed 80% of the property value.';
      throw error as IError;
    }
  }
}

export default DealService;
