import Sequelize from 'sequelize';
import context from '../dbContext';

let User = context.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING  
}, { tableName: 'User', timestamps: true, paranoid: true });

User.associate = function (models) {
  User.hasMany(models.UserPermission, {
    foreignKey: 'userId'
  });
}

export default User
