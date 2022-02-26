import { Category } from '../models'
import RepositoryBase from './repositoryBase';

export default class CategoryRepository extends RepositoryBase {
  constructor() {
    super(Category);
  }
}
