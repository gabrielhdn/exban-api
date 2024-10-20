import { Sequelize } from 'sequelize';
import Client from './Client';
import Property from './Property';
import Deal from './Deal';
import * as config from '../config/database';

const sequelize = new Sequelize(config);

Client.initModel(sequelize);
Property.initModel(sequelize);
Deal.initModel(sequelize);

Client.hasMany(Property, { foreignKey: 'clientId', as: 'properties' });
Client.hasMany(Deal, { foreignKey: 'clientId', as: 'deals' });

Property.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Property.hasMany(Deal, { foreignKey: 'propertyId', as: 'deals' });

Deal.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Deal.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

export { sequelize, Client, Property, Deal };
