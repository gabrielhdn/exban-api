import { Model, DataTypes, Sequelize } from 'sequelize';

class Deal extends Model {
  declare id: string;
  declare propertyId: string;
  declare clientId: string;
  declare value: number;
  declare issueDate: Date;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(sequelize: Sequelize) {
    Deal.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        propertyId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'properties',
            key: 'id',
          },
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'clients',
            key: 'id',
          },
        },
        value: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          validate: {
            isDecimal: true,
            min: 0,
          },
        },
        issueDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'deals',
        timestamps: true,
      },
    );
  }
}

export default Deal;
