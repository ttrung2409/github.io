import { Injectable } from "@angular/core";
import HttpService from "./http.service";
import { Observable } from "rxjs";
import Product from "../models/product";
import Customer from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export default class BulkDataService extends HttpService {
  findProductsWithIncomeBetween(params): Observable<Product[]> {
    return super._post('bulk-data/product/get-with-income-between', params);
  }

  findCustomersWithIncomeBetween(params): Observable<Customer[]> {
    return super._post('bulk-data/customer/get-with-income-between', params);
  }

  deleteProductsWithIncomeBetween(params): Observable<void> {
    return super._delete('bulk-data/product/delete-with-income-between', params);
  }

  deleteCustomersWithIncomeBetween(params): Observable<void> {
    return super._delete('bulk-data/customer/delete-with-income-between', params);
  }

  deleteProducts(ids: string) {
    return super._delete('bulk-data/product', { ids });
  }

  deleteCustomers(ids: string) {
    return super._delete('bulk-data/customer', { ids });
  }
}
