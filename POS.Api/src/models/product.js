import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import { modelSettings } from '../sequelize'

export default sequelize.define('Product', {
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
  wholeSalePrice: Sequelize.DECIMAL,
  discountPrice: Sequelize.DECIMAL,  
  isContainer: Sequelize.BOOLEAN,
  childItemId: Sequelize.INTEGER,
  childItemQty: Sequelize.DECIMAL
}, modelSettings);
