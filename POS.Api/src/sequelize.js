import Sequelize from 'sequelize';

export default new Sequelize('POS', 'postgres', 'abc123', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'  
});

export const modelSettings = {
  timestamps: true,
  freezeTableName: true,
  paranoid: true
}
