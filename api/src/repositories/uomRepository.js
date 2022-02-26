import { Uom } from '../models'
import RepositoryBase from './repositoryBase';

export default class UomRepository extends RepositoryBase {
  constructor() {
    super(Uom);
  }
}
