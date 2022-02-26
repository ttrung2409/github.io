import Sequelize from 'sequelize';
import context from '../dbContext';

let CustomerType = context.define('CustomerType', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,  
}, { tableName: 'CustomerType', timestamps: false });

CustomerType.associate = function (models) {
  CustomerType.hasMany(models.Customer, { foreignKey: 'typeId' }); 
}

export default CustomerType


