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
    return of(this._cachedProducts).pipe(
      concatAll(),
      filter(x => x.no.toLowerCase().includes(query.toLowerCase()) || x.name.toLowerCase().includes(query.toLowerCase())),
      map(x => _.cloneDeep(x)),
      toArray());
  }

  save(product: Product): Observable<Product> {
    return product.id > 0 ? this.put('product', product) : this.post('product', product);    
  }

  private _cachedProducts: Product[] = [
    new Product({
      id: 1,
      no: '100001',
      name: 'Giấy bạc Diamond ngắn',
      uom: 'Cuộn',
      retailPrice: 27000,
      wholesalePrice: 25000,
      discountPrice: 20000      
    }),
    new Product({
      id: 2,
      no: '100002',
      name: 'Giấy bạc Diamond dài',
      uom: 'Cuộn',
      retailPrice: 43000      
    }),
    new Product({
      id: 3,
      no: '100003',
      name: 'Bánh Gerber dâu táo 42g',
      uom: 'Bịch',
      retailPrice: 56000      
    }),
    new Product({
      id: 4,
      no: '100004',
      name: 'Bánh trẻ em cây chuối 42g',
      uom: 'Bịch',
      retailPrice: 60000     
    }),
    new Product({
      id: 5,
      no: '100005',
      name: 'Kẹo chip Hải Hà 175g',
      uom: 'Bịch',
      retailPrice: 14000
    }),
    new Product({
      id: 6,
      no: '100006',
      name: 'Kẹo trái cây Lot 100',
      uom: 'Bịch',
      retailPrice: 29000      
    }),
    new Product({
      id: 7,
      no: '100007',
      name: 'Kẹo xoài lot 100 - 150g',
      uom: 'Bịch',
      retailPrice: 29000      
    }),
    new Product({
      id: 8,
      no: '100008',
      name: 'NG attack khử mùi 1.4l',
      uom: 'Bình',
      retailPrice: 71000      
    }),
    new Product({
      id: 9,
      no: '100009',
      name: 'Tã dán Bobby SM L42',
      uom: 'Cuộn',
      retailPrice: 160000      
    }),
    new Product({
      id: 10,
      no: '100010',
      name: 'Bánh Gerber phô mai 42g',
      uom: 'Bịch',
      retailPrice: 60000      
    })
  ];
}
