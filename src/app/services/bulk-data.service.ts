import { Injectable } from "@angular/core";
import HttpService from "./http.service";

@Injectable()
export default class BulkDataService extends HttpService {
  findProductsWithIncomeBetween(from, to) {
    return super._get('bulk-data/get/products-with-income-between', { from, to });
  }

  findCustomersWithIncomeBetween(from, to) {
    return super._get('bulk-data/get/customers-with-income-between', { from, to });
  }

  deleteProductsWithIncomeBetween(from, to) {
    return super._delete('bulk-data/delete/products-with-income-between', { from, to });
  }

  deleteCustomersWithIncomeBetween(from, to) {
    return super._delete('bulk-data/delete/customers-with-income-between', { from, to });
  }
}
