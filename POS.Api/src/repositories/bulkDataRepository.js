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
}
