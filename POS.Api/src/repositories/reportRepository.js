import RepositoryBase from './repositoryBase';
import context from '../dbContext';
import { Customer, Invoice } from '../models';
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

export default class ReportRepository {
  getIncomeByInvoice(params) {
    return context.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    }, function(t) {
      let where = {};
      if (params.customerId > 0) {
        where.customerId = params.customerId;
      }

      if (!!params.fromDate) {
        where.date = {[Op.gte]: params.fromDate};
      }

      if (!!params.toDate) {
        where.date = Object.assign(where.date || {}, {[Op.lte]: params.toDate})
      }

      return Invoice.findAll({        
        where,
        include: [{ association: 'customer' }]      
      }).then(invoices => invoices.map(x => x.get({plain: true})));
    });
  }

  getIncomeByCustomer(params) {
    return context.query('select * from "getIncomeByCustomer"(:customerId, :fromDate, :toDate)', {
      replacements: {
        customerId: params.customerId || null,
        fromDate: params.fromDate || null,
        toDate: params.toDate || null
      },
      type: Sequelize.QueryTypes.SELECT
    });
  }
}
