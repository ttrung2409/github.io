import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import { modelSettings } from '../sequelize'

export default sequelize.define('Category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING  
}, modelSettings);

