import Product from "../models/product";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { filter, concatAll, reduce, tap, map, toArray } from 'rxjs/operators'
import Category from "../models/category";
import * as _ from 'lodash'
import HttpService from "./http.service";
import PagedResult from "../models/pagedResult";

@Injectable({
  providedIn: 'root'
})
export default class ProductService extends HttpService {
  search(params?: any): Observable<PagedResult<Product>> {
    return this._search('product/search', params);
  }

  get(id: number): Observable<Product> {
    return super._get<Product>(`product/${id}`);
  }

  allCategories(): Observable<Category[]> {
    return super._get<Category[]>('product/allCategories');    
  }

  allUoms(): Observable<string[]> {
    return super._get<string[]>('product/allUoms');    
  }

  lookup(query: string, { priceType = 'retail' } =  {}): Observable<Product[]> {
    return super._post<Product[]>('product/lookup', { query, priceType });   
  }

  save(product: Product): Observable<Product> {
    return product.id > 0 ? super._put('product', product) : super._post('product', product);    
  }

  delete(id: number): Observable<void> {
    return super._delete(`product/${id}`);
  }
}
