import Category from '../models/category'
import RepositoryBase from './repositoryBase';

export default class CategoryRepository extends RepositoryBase {
  constructor() {
    super(Category);
  }
}
