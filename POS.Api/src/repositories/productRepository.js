import Product from '../models/product'
import Sequelize from 'sequelize'
import RepositoryBase from './repositoryBase';
import * as _ from 'lodash'

const Op = Sequelize.Op;

export default class ProductRepository extends RepositoryBase {
  constructor() {
    super(Product);
  }

  create(product) {
    return Product.findOne({
      attributes: ['no'],
      order: [['no', 'desc']],
      limit: 1
    }).then(model => {
      product.no = !!model ? `SP${parseFloat(model.no.replace(/^SP/, '')) + 1}` : 'SP10000';
      return super.create(product);
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
       
    if (!!params.includeDeleted) {      
    }

    return super.search(params, where);    
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
