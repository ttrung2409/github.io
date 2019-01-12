import Sequelize from 'sequelize';
import context from '../dbContext';

export default context.define('Uom', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
}, { tableName: 'Uom', timestamps: false });

