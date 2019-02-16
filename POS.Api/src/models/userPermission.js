import Sequelize from 'sequelize';
import context from '../dbContext';

let UserPermission = context.define('UserPermission', {  
  userId: Sequelize.INTEGER,
  permissionId: Sequelize.INTEGER
}, { tableName: 'Permission', timestamps: false });

UserPermission.associate = function (models) {
  
}

export default UserPermission
