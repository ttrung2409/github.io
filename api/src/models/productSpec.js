import Sequelize from 'sequelize';
import context from '../dbContext';

let ProductSpec = context.define('ProductSpec', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: Sequelize.INTEGER,
  uomId: Sequelize.INTEGER,
  qty: Sequelize.DECIMAL
}, { tableName: 'ProductSpec', timestamps: false });

ProductSpec.associate = function (models) {
  ProductSpec.belongsTo(models.Product, { foreignKey: 'productId' });
  ProductSpec.belongsTo(models.Uom, { foreignKey: 'uomId', as: 'uom' });
}

export default ProductSpec
