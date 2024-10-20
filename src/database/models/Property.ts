import { Model, DataTypes, Sequelize } from 'sequelize';

class Property extends Model {
  declare id: string;
  declare address: string;
  declare value: number;
  declare clientId: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(sequelize: Sequelize) {
    Property.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        value: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          validate: {
            isDecimal: true,
            min: 0,
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
        tableName: 'properties',
        timestamps: true,
      },
    );
  }
}

export default Property;
