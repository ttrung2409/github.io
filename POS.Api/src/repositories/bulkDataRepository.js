import context from '../dbContext'
import Sequelize from 'sequelize'
import { Product, Customer } from '../models'

const Op = Sequelize.Op;

export default class BulkDataRepository {
  getCustomersWithIncomeBetween(params) {
    return context.query('select * from "getCustomersWithIncomeBetween"(:fromDate, :toDate, :fromAmount, :toAmount)', {
      replacements: params,
      type: Sequelize.QueryTypes.SELECT
    });    
  }

  getProductsWithIncomeBetween(params) {
    return context.query('select * from "getProductsWithIncomeBetween"(:fromDate, :toDate, :fromAmount, :toAmount)', {
      replacements: params,
      type: Sequelize.QueryTypes.SELECT
    });    
  }

  deleteProducts(ids) {
    return Product.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  deleteCustomers(ids) {
    return Customer.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }
}
