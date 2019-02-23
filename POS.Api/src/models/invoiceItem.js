import Sequelize from 'sequelize';
import context from '../dbContext';

let InvoiceItem = context.define('InvoiceItem', {  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceId: Sequelize.INTEGER,
  productId: Sequelize.INTEGER,
  qty: Sequelize.DECIMAL,
  price: Sequelize.DECIMAL,
  cost: Sequelize.DECIMAL,
  discount: Sequelize.DECIMAL,
  tax: Sequelize.DECIMAL,
  notes: Sequelize.TEXT
}, { tableName: 'InvoiceItem', timestamps: false });

InvoiceItem.associate = function (models) {
  InvoiceItem.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
  InvoiceItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
}

export default InvoiceItem
