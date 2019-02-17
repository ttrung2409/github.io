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
    return super._post('bulk-data/get/products-with-income-between', params);
  }

  findCustomersWithIncomeBetween(params): Observable<Customer[]> {
    return super._post('bulk-data/get/customers-with-income-between', params);
  }

  deleteProductsWithIncomeBetween(params): Observable<void> {
    return super._delete('bulk-data/products-with-income-between', params);
  }

  deleteCustomersWithIncomeBetween(params): Observable<void> {
    return super._delete('bulk-data/customers-with-income-between', params);
  }
}
