import RepositoryBase from './repositoryBase';
import context from '../dbContext';
import { Customer, Invoice } from '../models';
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

export default class ReportRepository {
  getIncomeByInvoice(params) {
    return context.query('select * from "getIncomeByInvoice"(:customerId, :fromDate, :toDate, :skip, :take, :orderBy, :isDesc)', {
      replacements: {
        customerId: params.customerId || null,
        fromDate: params.fromDate || null,
        toDate: params.toDate || null,
        skip: (params.index - 1) * params.size,
        take: params.size,
        orderBy: params.orderBy,
        isDesc: params.isDesc
      },
      type: Sequelize.QueryTypes.SELECT
    });
  }

  getIncomeSummaryByInvoice(params) {
    return context.query('select * from "getIncomeSummaryByInvoice"(:customerId, :fromDate, :toDate)', {
      replacements: {
        customerId: params.customerId || null,
        fromDate: params.fromDate || null,
        toDate: params.toDate || null
      },
      type: Sequelize.QueryTypes.SELECT
    }).then(result => result[0]);
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
