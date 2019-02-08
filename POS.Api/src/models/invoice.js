import Sequelize from 'sequelize';
import context from '../dbContext';

let Invoice = context.define('Invoice', {  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  no: Sequelize.STRING,
  status: Sequelize.STRING,
  date: Sequelize.DATEONLY,
  customerId: Sequelize.INTEGER,
  discount: Sequelize.DECIMAL,
  tax: Sequelize.DECIMAL,
  freight: Sequelize.DECIMAL,
  fee: Sequelize.DECIMAL,
  subTotal: Sequelize.DECIMAL,
  total: Sequelize.DECIMAL,
  totalCost: Sequelize.DECIMAL
}, { tableName: 'Invoice', timestamps: true, paranoid: true });

Invoice.associate = function (models) {
  Invoice.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId', as: 'items' });
  Invoice.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
  Invoice.hasMany(models.Payment, { foreignKey: 'invoiceId', as: 'payments' });
}

export default Invoice

