import Product from '../models/product'
import Sequelize from 'sequelize'
import RepositoryBase from './repositoryBase';

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

    if (!!params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      }
    }

    if (!!params.includeDeleted) {      
    }

    return super.search(params, where);    
  }
}
