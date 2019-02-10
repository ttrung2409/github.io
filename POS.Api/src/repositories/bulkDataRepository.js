import context from '../dbContext'
import Sequelize from 'sequelize'

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

  deleteProductsWithIncomeBetween(params) {
    return context.query('call "deleteProductsWithIncomeBetween"(:fromDate, :toDate, :fromAmount, :toAmount)', {
      replacements: params
    });
  }

  deleteCustomersWithIncomeBetween(params) {
    return context.query('call "deleteCustomersWithIncomeBetween"(:fromDate, :toDate, :fromAmount, :toAmount)', {
      replacements: params
    });
  }
}
