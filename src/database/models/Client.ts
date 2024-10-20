import { Model, DataTypes, Sequelize } from 'sequelize';

class Client extends Model {
  declare id: string;
  declare name: string;
  declare fiscalIdentifier: string;
  declare email: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(sequelize: Sequelize) {
    Client.init(
      {
        id: {
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          type: DataTypes.UUID,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        fiscalIdentifier: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
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
        tableName: 'clients',
        timestamps: true,
      },
    );
  }
}

export default Client;
