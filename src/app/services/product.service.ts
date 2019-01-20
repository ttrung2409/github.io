import Product from "../models/product";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { filter, concatAll, reduce, tap, map, toArray } from 'rxjs/operators'
import Category from "../models/category";
import * as _ from 'lodash'
import HttpService from "./http.service";
import PagedResult from "../models/pagedResult";

@Injectable()
export default class ProductService extends HttpService {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  search(params?: any): Observable<PagedResult<Product>> {
    return this._search('product/search', params);
  }

  getProduct(id: number): Observable<Product> {
    return this.get<Product>(`product/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.get<Category[]>('product/category');    
  }

  getUoms(): Observable<string[]> {
    return this.get<string[]>('product/uom');    
  }

  lookup(query: string): Observable<Product[]> {
    return this.get<Product[]>('product/lookup', { query });   
  }

  save(product: Product): Observable<Product> {
    return product.id > 0 ? this.put('product', product) : this.post('product', product);    
  }

  delete(id: number): Observable<{}> {
    return super._delete(`product/${id}`);
  }
}
