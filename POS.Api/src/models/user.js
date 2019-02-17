import Sequelize from 'sequelize';
import context from '../dbContext';

let User = context.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,    
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  address: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING  
}, { tableName: 'User', timestamps: true, paranoid: true });

User.associate = function (models) {
  User.hasMany(models.UserPermission, { as: 'permissions', foreignKey: 'userId' });    
}

export default User
