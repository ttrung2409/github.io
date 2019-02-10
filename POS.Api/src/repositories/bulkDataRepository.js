import context from '../dbContext'
import Sequelize from 'sequelize'

export default class BulkDataRepository {
  getCustomersWithIncomeBetween(from, to) {
    return context.query('select * from getCustomersWithIncomeBetween(:from, :to)', {
      replacements: { from, to },
      type: Sequelize.QueryTypes.SELECT
    });    
  }

  getProductsWithIncomeBetween(from, to) {
    return context.query('select * from getProductsWithIncomeBetween(:from, :to)', {
      replacements: { from, to },
      type: Sequelize.QueryTypes.SELECT
    });    
  } 
}
