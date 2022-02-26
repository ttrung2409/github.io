import Sequelize from 'sequelize';
import context from '../dbContext';

let UserPermission = context.define('UserPermission', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: Sequelize.INTEGER,
  permissionId: Sequelize.INTEGER
}, { tableName: 'UserPermission', timestamps: false });

UserPermission.associate = function (models) {
  UserPermission.belongsTo(models.User, { foreignKey: 'userId' });
  UserPermission.belongsTo(models.Permission, { as: 'permission', foreignKey: 'permissionId' });
}

export default UserPermission
