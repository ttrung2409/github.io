import RepositoryBase from './repositoryBase';
import context from '../dbContext';
import { User, UserType } from '../models';
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

export default class UserRepository extends RepositoryBase {
  constructor() {
    super(User);
  }

  allPermissions() {

  }
}
