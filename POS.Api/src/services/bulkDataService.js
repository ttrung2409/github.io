import BulkDataRepository from "../repositories/bulkDataRepository";

let repo = new BulkDataRepository();

export default class BulkDataService {
  getCustomersWithIncomeBetween(from, to) {
    return repo.getCustomersWithIncomeBetween(from, to);
  }

  getProductsWithIncomeBetween(from, to) {
    return repo.getProductsWithIncomeBetween(from, to);
  } 
}
