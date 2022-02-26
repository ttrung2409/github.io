import Sequelize from 'sequelize';
import context from '../dbContext';

export default context.define('Category', {  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING  
}, { tableName: 'Category', timestamps: false });

