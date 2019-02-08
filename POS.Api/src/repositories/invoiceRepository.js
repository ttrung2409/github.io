import RepositoryBase from './repositoryBase';
import context from '../dbContext';
import { Invoice, InvoiceItem, Product, Customer } from '../models';
import Sequelize from 'sequelize'
import * as _ from 'lodash'

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
          include: [{ association: 'product' }],          
        },
        { association: 'payments' },
        { association: 'customer' }
      ],
      order: [[{ model: InvoiceItem, as: 'items' }, 'id', 'asc']]
    }).then(model => {
      return !!model ? model.get({ plain: true }) : null;
    });
  }

  lookup(query) {
    let where = {
      [Op.or]: {
        no: {
          [Op.iLike]: `%${query}%`
        },
        '$customer.no$': {
          [Op.iLike]: `%${query}%`
        },
        '$customer.name$': Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('customer.name')), {
          [Op.iLike]: `%${query}%`
        }),
        '$customer.phone$': {
          [Op.iLike]: `%${query}%`
        },
        '$customer.email$': {
          [Op.iLike]: `%${query}%`
        }
      }
    };

    return this.modelDef.findAll({
      where,
      limit: 10,
      include: [{ association: 'customer' }],
      order: [['date', 'desc']],     
    }).then(invoices => invoices.map(x => x.get({ plain: true })));
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
          include: [{ association: 'items' }, { association: 'payments' }]
        }).then(model => model.get({ plain: true }));
      });
    }    
  }

  updateWithItems(id, invoice, { transaction } = {}) {
    let _this = this;
    return !!transaction ? updateWithItems(transaction) : context.transaction(updateWithItems);

    function updateWithItems(t) {
      return _this.modelDef.findOne({
        where: {
          id
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
