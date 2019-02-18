import RepositoryBase from './repositoryBase';
import context from '../dbContext';
import { User, UserPermission } from '../models';
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

export default class UserRepository extends RepositoryBase {
  constructor() {
    super(User);
  }

  getFull(id) {
    return this.modelDef.findOne({
      where: { id },
      include: [{ association: 'permissions' }],
    }).then(model => {
      return !!model ? model.get({ plain: true }) : null;
    });
  }

  getByUsername(username) {
    return this.modelDef.findOne({
      where: {
        username
      },
      include: [{
        association: 'permissions', include: [{ association: 'permission' }]
      }]
    }).then(model => !!model ? model.get({ plain: true }) : null);
  }

  create(user, { transaction } = {}) {    
    return this.modelDef.create(user, {
      transaction,
      include: [{association: 'permissions' }]
    }).then(model => model.get({ plain: true }));
  }

  update(user, { transaction } = {}) {
    let _this = this;
    return !!transaction ? update(transaction) : context.transaction(update);

    function update(t) {
      return _this.modelDef.findOne({
        where: {
          id: user.id
        },
        include: [{ association: 'permissions' }]
      }, { transaction: t }).then(model => {
        if (!model) return;
        
        let oldPermissions = model.permissions;
        let permissionsToCreate = user.permissions.filter(x => !oldPermissions.some(p => p.permissionId == x.permissionId));
        let permissionsToDelete = oldPermissions.filter(x => !user.permissions.some(p => p.permissionId == x.permissionId));

        let promises = [];
        promises.push(model.update(user, { transaction: t }));

        if (permissionsToCreate.length > 0) {
          promises.push(UserPermission.bulkCreate(
            permissionsToCreate.map(x => Object.assign(x, { userId: user.id })), { transaction: t }));
        }

        if (permissionsToDelete.length > 0) {
          promises.push(UserPermission.destroy({
            where: {
              userId: user.id,
              permissionId: {
                [Op.in]: permissionsToDelete.map(x => x.permissionId)
              }              
            }
          }, { transaction: t }));
        }

        return Promise.all(promises).then(() => user);
      });
    }
  }
}
