import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy, ElementRef } from '@angular/core';
import ProductService from '../../../services/product.service';
import { GridColumn, GridComponent } from '../../../widgets/grid/grid.component';
import Product from '../../../models/product';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import Category from '../../../models/category';
import { ProductComponent } from '../product/product.component';
import { fromEvent, Subscription } from 'rxjs';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  constructor(private productService: ProductService) {
  }

  columns: GridColumn[];
  products: Product[];
  selectedProduct: Product = new Product();
  search: any = {};
  categories: Category[];
  states: any[] = [{ value: 1, text: 'Hoạt động' }, { value: 0, text: 'Không hoạt động' }]

  @ViewChild(FlyoutComponent) flyout: FlyoutComponent;
  @ViewChild('product') productView: ProductComponent;
  @ViewChild('grid') grid: GridComponent;

  ngOnInit() {
    this.columns = [
      new GridColumn({
        caption: 'Mã SP',
        field: 'no'        
      }),
      new GridColumn({
        caption: 'Tên SP',
        field: 'name'        
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'uom'
      }),
      new GridColumn({
        caption: 'Giá nhập',
        field: 'cost'        
      }),
      new GridColumn({
        caption: 'Giá lẻ',
        field: 'retailPrice'
      }),
      new GridColumn({
        caption: 'Giá sỉ',
        field: 'wholeSalePrice'
      }),
      new GridColumn({
        caption: 'Giá khuyến mãi',
        field: 'discountPrice'
      })
    ];

    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.productService.getCategories().subscribe(categories => this.categories = categories);    

    this._subscription = fromEvent(document, 'keyup').subscribe((e: KeyboardEvent) => {
      switch (e.keyCode) {
        case Key.Escape:
          this.cancel();
          break;
        case Key.F4:
          this.save();          
          break;          
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onSelect(row) {    
    this.selectedProduct = row;    
    this.flyout.show().then(() => {
      this.productView.focus();      
    });    
  }

  add() {
    this.selectedProduct = new Product();
    this.flyout.show();
  }

  cancel() {
    this.productView.cancel();
    this.flyout.hide();
  }

  save() {
    this.productView.save();
    this.flyout.hide();
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });    
  }
}
