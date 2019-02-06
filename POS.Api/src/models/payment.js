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
  method: Sequelize.STRING 
}, { tableName: 'Payment', timestamps: true, paranoid: true });

Payment.associate = function (models) {
  Payment.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
}

export default Payment

