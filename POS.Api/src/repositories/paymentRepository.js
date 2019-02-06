import RepositoryBase from './repositoryBase';
import { Invoice, Payment } from '../models';

export default class InvoiceRepository extends RepositoryBase {
  constructor() {
    super(Payment);
  }
}
