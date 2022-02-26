import BulkDataRepository from "../repositories/bulkDataRepository";

let repo = new BulkDataRepository();

export default class BulkDataService {
  getCustomersWithIncomeBetween(params) {
    return repo.getCustomersWithIncomeBetween(params);
  }

  getProductsWithIncomeBetween(params) {
    return repo.getProductsWithIncomeBetween(params);
  }  

  deleteProducts(ids) {
    return repo.deleteProducts(ids);
  }

  deleteCustomers(ids) {
    return repo.deleteCustomers(ids);
  }
}
