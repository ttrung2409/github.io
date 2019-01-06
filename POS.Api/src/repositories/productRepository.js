import Product from '../models/product'
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

export default class ProductRepository {
  get(id) {
    return Product.findById(id).then(product => {
      return !!product ? product.get({ plain: true }) : null;
    });
  }

  create(product) {
    return Product.findOne({
      attributes: ['no'],
      order: [['no', 'desc']],
      limit: 1
    }).then(model => {      
      return !!model ? `SP${parseFloat(model.no.replace(/^SP/, '')) + 1}` : 'SP10000';      
    }).then(no => {
      product.no = no;
      return Product.create(product).then(model => {
        return model.get({ plain: true });
      });
    });
  }

  update(product) {
    return Product.findById(product.id).then(model => {      
      if (!!model) {
        return model.update(product).then(() => product);
      }

      return product;
    });
  }

  search(params) {
    debugger;
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

    return Product.findAndCountAll({
      where,
      order: [[params.orderBy, !!params.isDesc ? 'desc' : 'asc']],
      offset: (params.currentPage - 1) * params.pageSize,
      limit: params.pageSize
    }).then(result => {
      result.rows = result.rows.map(x => x.get({ plain: true }));
      return result;
    });;
  }
}
