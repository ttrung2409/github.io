import Sequelize from 'sequelize';
import context from '../dbContext';

let Uom = context.define('Uom', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
}, { tableName: 'Uom', timestamps: false });

Uom.associate = function (models) {
  Uom.hasMany(models.Product, { foreignKey: 'uomId' });
  Uom.hasMany(models.ProductSpec, { foreignKey: 'uomId' });  
}

export default Uom



