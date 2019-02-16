import Sequelize from 'sequelize';
import context from '../dbContext';

let Permission = context.define('Permission', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
}, { tableName: 'Permission', timestamps: false });

Permission.associate = function (models) {
  Permission.hasMany(models.UserPermission, {
    foreignKey: 'permissionId'
  });
}

export default Permission
