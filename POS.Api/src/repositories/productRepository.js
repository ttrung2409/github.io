import { Product, ProductSpec, Uom } from '../models'
import Sequelize from 'sequelize'
import RepositoryBase from './repositoryBase';
import * as _ from 'lodash'
import context from '../dbContext';

const Op = Sequelize.Op;

export default class ProductRepository extends RepositoryBase {
  constructor() {
    super(Product);
  }

  get(id, { includeDeleted } = {}) {
    return Product.findOne({
      where: { id },
      paranoid: includeDeleted ? false : true,
      include: [{ association: 'spec' }, { association: 'uom' }],
    }).then(model => model.get({ plain: true }));
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
        return _this.modelDef.create(product, {
          transaction: t,
          include: [{ association: 'spec' }]
        }).then(model => model.get({ plain: true }));
      });
    });
  }

  update(product) {
    let _this = this;
    return context.transaction(function(t) {
      return _this.modelDef.findOne({
        where: { id: product.id },
        include: [{ association: 'spec' }]
      }).then(model => {
        if (!model) return;

        let promises = [];
        promises.push(model.update(product, { transaction: t }));

        if (!!product.spec) {
          if (model.spec.id > 0) {
            promises.push(model.spec.update(product.spec, { transaction: t }));
          }
          else {
            product.spec.productId = product.id;
            promises.push(ProductSpec.create(product.spec, { transaction: t }));
          }
        }

        return Promise.all(promises).then(() => product);
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
      where.name = Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('Product.name')), {
        [Op.iLike]: `%${params.name}%`
      });
    }

    if (params.categoryId > 0) {
      where.categoryId = params.categoryId;
    }

    let order = [params.orderBy, !!params.isDesc ? 'desc' : 'asc'];
    if (params.orderBy == 'uom.name') {
      order = [{ model: Uom, as: 'uom' }, 'name', !!params.isDesc ? 'desc' : 'asc'];
    }

    return this.modelDef.findAndCountAll({
      where,
      include: [{ association: 'uom' }],
      order: [order],
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
          name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('Product.name')), {
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
      include: [{
        association: 'spec',
        include: [{association: 'uom'}]
      }, { association: 'uom' }],
      limit: 10
    }).then(products => products.map(x => x.get({ plain: true })));
  }

  delete(id) {
    return this.modelDef.destroy({
      where: { id }
    });
  }
}
