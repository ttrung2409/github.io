import Sequelize from 'sequelize';
import context from '../dbContext';

let Payment = context.define('Payment', {  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceId: Sequelize.INTEGER,
  customerId: Sequelize.INTEGER,
  amount: Sequelize.DECIMAL,
  method: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE
}, { tableName: 'Payment', timestamps: true, paranoid: true });

export default Payment

