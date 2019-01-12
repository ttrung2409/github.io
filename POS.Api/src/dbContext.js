import Sequelize from 'sequelize';

export default new Sequelize('POS', 'postgres', 'admin', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  define: {
    timestamps: false,
    paranoid: false
  }
});
