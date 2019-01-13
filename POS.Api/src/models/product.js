import Sequelize from 'sequelize';
import context from '../dbContext';

export default context.define('Product', {  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  no: Sequelize.STRING,
  name: Sequelize.STRING,
  uom: Sequelize.STRING,
  barcode: Sequelize.STRING,
  categoryId: Sequelize.INTEGER,
  cost: Sequelize.DECIMAL,
  retailPrice: Sequelize.DECIMAL,
  wholesalePrice: Sequelize.DECIMAL,
  discountPrice: Sequelize.DECIMAL,  
  isContainer: Sequelize.BOOLEAN,
  childItemId: Sequelize.INTEGER,
  childItemQty: Sequelize.DECIMAL,
  notes: Sequelize.TEXT
}, { tableName: 'Product', timestamps: true, paranoid: true });
