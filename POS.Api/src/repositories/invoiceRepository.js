import RepositoryBase from './repositoryBase';
import context from '../dbContext';
import { Invoice, InvoiceItem, Product, Customer } from '../models';
import Sequelize from 'sequelize'
import * as _ from 'lodash'
import config from '../config';

const Op = Sequelize.Op;

export default class InvoiceRepository extends RepositoryBase {
  constructor() {
    super(Invoice);
  }  

  getFull(id) {
    return this.modelDef.findOne({
      where: {
        id
      },
      include: [
        {
          association: 'items',
          include: [{
            association: 'product',
            paranoid: false,
            include: [{
              association: 'spec',
              include: [{ association: 'uom' }]
            }, { association: 'uom' }]
          }],
        },
        { association: 'payments' },
        { association: 'customer', paranoid: false }
      ],
      order: [[{ model: InvoiceItem, as: 'items' }, 'id', 'asc']]
    }).then(model => {
      return !!model ? model.get({ plain: true }) : null;
    });
  }

  lookup(query, { recent } = {}) {
    if (recent) {
      return this.modelDef.findAll({
        where: {
          date: { [Op.gte]: new Date() },
          status: { [Op.or]: ['Partial', 'Paid']}
        },
        limit: config.lookupLimit,
        include: [{ association: 'customer', paranoid: false }],
        order: [['status', 'desc'], ['no', 'desc']],
      }).then(invoices => invoices.map(x => x.get({ plain: true })));
    }
    else {
      return context.query('select * from "lookupInvoices"(:query, :take)', {
        replacements: {
          query,
          take: config.lookupLimit,
        },
        type: Sequelize.QueryTypes.SELECT
      }).then(invoices => invoices.map(x => Object.assign(x, {
        customer: {
          id: x.customerId,
          no: x.customerNo,
          name: x.customerName,
          phone: x.customerPhone,
          email: x.customerEmail
        }
      })));
    }
  }  

  create(invoice, { transaction } = {}) {
    let _this = this;
    return !!transaction ? create(transaction) : context.transaction(create);

    function create(t) {
      return Invoice.findOne({
        attributes: ['no'],
        order: [['no', 'desc']],
        limit: 1,
        paranoid: false,
      }, { transaction: t }).then(model => {
        invoice.no = !!model ? `${parseFloat(model.no) + 1}` : '100000';
        return _this.modelDef.create(invoice, {
          transaction: t,
          include: [{ association: 'items' }]
        }).then(model => model.get({ plain: true }));
      });
    }    
  }

  update(invoice, { transaction } = {}) {
    let _this = this;
    return !!transaction ? update(transaction) : context.transaction(update);

    function update(t) {
      return _this.modelDef.findOne({
        where: {
          id: invoice.id
        },
        include: [{ association: 'items' }]
      }, { transaction: t }).then(model => {
        if (!model) return;

        let oldItems = model.items;
        let itemsToCreate = invoice.items.filter(x => !x.id);
        let itemsToUpdate = invoice.items.filter(x => x.id > 0);
        let itemsToDelete = oldItems.filter(x => !invoice.items.some(item => item.id == x.id));

        let promises = [];
        promises.push(model.update(invoice, { transaction: t }));

        if (itemsToCreate.length > 0) {
          promises.push(InvoiceItem.bulkCreate(itemsToCreate, { transaction: t }));
        }

        for (let item of itemsToUpdate) {
          let itemModel = oldItems.find(x => x.id == item.id);
          if (!!itemModel) {
            promises.push(itemModel.update(item, { transaction: t }));
          }
        }

        if (itemsToDelete.length > 0) {
          promises.push(InvoiceItem.destroy({
            where: {
              id: {
                [Op.in]: itemsToDelete.map(x => x.id)
              }
            }
          }, { transaction: t }));
        }

        return Promise.all(promises).then(() => invoice);
      });  
    }      
  }  

  delete(id) {
    return this.modelDef.destroy({
      where: { id }
    });
  }
}
