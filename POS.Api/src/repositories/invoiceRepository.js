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
      [Op.or]: [
        {
          no: {
            [Op.iLike]: `%${query}%`
          }
        },
        {
          name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
            [Op.iLike]: `%${query}%`
          })
        },
        {
          phone: {
            [Op.iLike]: `%${query}%`
          }
        }        
      ]
    };

    return this.modelDef.findAll({
      where,
      limit: 10
    }).then(invoices => invoices.map(x => x.get({ plain: true })));
  }

  create(invoice) {
    let _this = this;
    return context.transaction(function (t) {
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
    });    
  }

  updateAll(id, invoice) {
    return this.modelDef.findOne({
      where: {
        id
      },
      include: [{ association: 'items' }]
    }).then(model => {
      if (!model) return;
      
      return context.transaction().then(t => {
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

        return Promise.all(promises)
          .then(() => t.commit())
          .catch(err => {
            console.log(err);
            t.rollback();
            throw err;
          });
      });   
    });    
  }

  delete(id) {
    return this.modelDef.destroy({
      where: { id }
    });
  }
}
