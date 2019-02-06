import RepositoryBase from './repositoryBase';
import context from '../dbContext';
import { Customer, CustomerType } from '../models';
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

export default class CustomerRepository extends RepositoryBase {
  constructor() {
    super(Customer);
  }

  search(params) {
    let where = {};
    if (!!params.no) {
      where.no = {
        [Op.iLike]: `%${params.no}%`
      }
    }

    if (!!params.name) {
      where.name = Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
        [Op.iLike]: `%${params.name}%`
      });
    }

    if (!!params.phone) {
      where.phone = {
        [Op.iLike]: `%${params.phone}%`
      }
    }

    if (params.typeId > 0) {
      where.typeId = params.typeId;
    }

    if (!!params.email) {
      where.email = {
        [Op.iLike]: `%${params.email}%`
      }
    }

    let order = [params.orderBy, !!params.isDesc ? 'desc' : 'asc'];
    if (params.orderBy == 'type.name') {
      order = [{ model: CustomerType, as: 'type' }, 'name', !!params.isDesc ? 'desc' : 'asc'];
    }

    return this.modelDef.findAndCountAll({
      where,
      order: [order],
      offset: (params.index - 1) * params.size,
      limit: params.size,
      paranoid: params.includeDeleted ? false : true,
      include: [{
        model: CustomerType,
        as: 'type'
      }]
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
          phone: {
            [Op.iLike]: `%${query}%`
          }
        },
        {
          email: {
            [Op.iLike]: `%${query}%`
          }
        }
      ]
    };

    return this.modelDef.findAll({
      where,
      limit: 10
    }).then(customers => customers.map(x => x.get({ plain: true })));
  }

  create(customer) {
    let _this = this;
    return context.transaction(function (t) {
      return Customer.findOne({
        attributes: ['no'],
        order: [['no', 'desc']],
        limit: 1,
        paranoid: false,
      }, { transaction: t }).then(model => {
        customer.no = !!model ? `KN${parseFloat(model.no.replace(/^KN/, '')) + 1}` : 'KN1000';
        return _this.modelDef.create(customer, { transaction: t }).then(model => {
          return model.get({ plain: true });
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
