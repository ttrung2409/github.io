import { Product } from '../models'
import Sequelize from 'sequelize'
import RepositoryBase from './repositoryBase';
import * as _ from 'lodash'
import context from '../dbContext';

const Op = Sequelize.Op;

export default class ProductRepository extends RepositoryBase {
  constructor() {
    super(Product);
  }

  create(product) {
    let _this = this;
    return context.transaction(function (t) {
      return Product.findOne({
        attributes: ['no'],
        order: [['no', 'desc']],
        limit: 1,
        paranoid: false,
      }, { transaction: t }).then(model => {
        product.no = !!model ? `SP${parseFloat(model.no.replace(/^SP/, '')) + 1}` : 'SP10000';
        return _this.modelDef.create(product, { transaction: t }).then(model => {
          return model.get({ plain: true });
        });    
      });
    });
  }

  search(params) {
    let where = {};
    if (!!params.no) {
      where.no = {
        [Op.iLike]: `%${params.no}%`
      }
    }

    if (!!params.barcode) {
      where.barcode = {
        [Op.iLike]: `%${params.barcode}%`
      }
    }

    if (!!params.name) {
      where.name = Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
        [Op.iLike]: `%${params.name}%`
      });
    }
       
    return this.modelDef.findAndCountAll({
      where,
      order: [[params.orderBy, !!params.isDesc ? 'desc' : 'asc']],
      offset: (params.index - 1) * params.size,
      limit: params.size,
      paranoid: params.includeDeleted ? false : true,
    }).then(result => {
      result.rows = result.rows.map(x => x.get({ plain: true }));
      return result;
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
          barcode: {
            [Op.iLike]: `%${query}%`
          }
        }
      ]
    };

    return this.modelDef.findAll({
      where,
      limit: 10
    }).then(products => products.map(x => x.get({ plain: true })));
  }

  delete(id) {
    return this.modelDef.destroy({
      where: { id }
    });
  }
}
