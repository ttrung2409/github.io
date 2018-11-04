import Product from "../models/product";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { filter, concatAll, reduce } from 'rxjs/operators'
import Category from "../models/category";
import * as _ from 'lodash'

@Injectable()
export default class ProductService {
  _products: Product[] = [
    new Product({
      id: 1,
      no: '100001',
      name: 'Giấy bạc Diamond ngắn',
      retailPrice: 27000
    }),
    new Product({
      id: 2,
      no: '100002',
      name: 'Giấy bạc Diamond dài',
      retailPrice: 43000
    }),
    new Product({
      id: 3,
      no: '100003',
      name: 'Bánh Gerber dâu táo 42g',
      retailPrice: 56000
    }),
    new Product({
      id: 4,
      no: '100004',
      name: 'Bánh trẻ em cây chuối 42g',
      retailPrice: 60000
    }),
    new Product({
      id: 5,
      no: '100005',
      name: 'Kẹo chip Hải Hà 175g',
      retailPrice: 14000
    }),
    new Product({
      id: 6,
      no: '100006',
      name: 'Kẹo trái cây Lot 100',
      retailPrice: 29000
    }),
    new Product({
      id: 7,
      no: '100007',
      name: 'Kẹo xoài lot 100 - 150g',
      retailPrice: 29000
    }),
    new Product({
      id: 8,
      no: '100008',
      name: 'NG attack khử mùi 1.4l',
      retailPrice: 71000
    }),
    new Product({
      id: 9,
      no: '100009',
      name: 'Tã dán Bobby SM L42',
      retailPrice: 160000
    }),
    new Product({
      id: 10,
      no: '100010',
      name: 'Bánh Gerber phô mai 42g',
      retailPrice: 60000
    }),
  ]
  
  public getProducts(params?: any): Observable<Product[]> {
    return of(_.cloneDeep(this._products));
  }

  getProduct(id: number): Observable<Product> {
    return this.getProducts().pipe(concatAll(), filter(x => x.id == id));
  }

  getCategories(): Observable<Category[]> {
    return of([
      new Category({
        id: 1,
        name: 'Bánh kẹo'
      }),
      new Category({
        id: 2,
        name: 'Cafe'
      }),
      new Category({
        id: 3,
        name: 'Sữa bột'
      }),
      new Category({
        id: 4,
        name: 'Văn phòng phẩm'
      })]);
  }

  getUOMs(): Observable<string[]> {
    return of([
      'Bịch',
      'Thùng',      
      'Cái',
      'Cuộn'
    ]);
  }

  lookup(query: string) {
    return this.getProducts()
      .pipe(concatAll())
      .pipe(filter(x => x.no.toLowerCase().includes(query.toLowerCase()) || x.name.toLowerCase().includes(query.toLowerCase())))
      .pipe(reduce((acc, value) => acc.concat(value), []));
  }

  save(product: Product) {
    let p = this._products.find(x => x.id == product.id);
    if (!!p) {
      Object.assign(p, product);
    }
  }
}
