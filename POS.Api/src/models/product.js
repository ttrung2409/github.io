import Sequelize from 'sequelize';
import context from '../dbContext';

let Product = context.define('Product', {  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  no: Sequelize.STRING,
  name: Sequelize.STRING,
  barcode: Sequelize.STRING,
  uomId: Sequelize.INTEGER,  
  categoryId: Sequelize.INTEGER,
  cost: Sequelize.DECIMAL,
  retailPrice: Sequelize.DECIMAL,
  wholesalePrice: Sequelize.DECIMAL,
  discountPrice: Sequelize.DECIMAL,    
  notes: Sequelize.TEXT
}, { tableName: 'Product', timestamps: true, paranoid: true });

Product.associate = function (models) {  
  Product.hasOne(models.ProductSpec, { foreignKey: 'productId', as: 'spec' });
  Product.belongsTo(models.Uom, { foreignKey: 'uomId', as: 'uom' });
}

export default Product
