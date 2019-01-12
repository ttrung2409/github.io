import Uom from '../models/uom'
import RepositoryBase from './repositoryBase';

export default class UomRepository extends RepositoryBase {
  constructor() {
    super(Uom);
  }
}
