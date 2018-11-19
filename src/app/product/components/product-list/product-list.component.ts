import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy, ElementRef } from '@angular/core';
import ProductService from '../../../services/product.service';
import { GridColumn, GridComponent } from '../../../widgets/grid/grid.component';
import Product from '../../../models/product';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import Category from '../../../models/category';
import { ProductComponent } from '../product/product.component';
import { fromEvent, Subscription } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import { ProductSearchComponent } from '../product-search/product-search.component';

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
  flyoutView: string;
  
  @ViewChild(FlyoutComponent) flyout: FlyoutComponent;
  @ViewChild('productView') productView: ProductComponent;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('productSearchView') productSearchView: ProductSearchComponent;

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

    this._subscription = fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => {
      switch (event.keyCode) {
        case Key.F2:
          this.showSearchView();          
          break;
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onSelect(row) {    
    this.selectedProduct = row;
    this.flyoutView = 'product';
    this.flyout.show().then(() => {
      this.productView.focus();      
    });    
  }

  onSearch(params) {
    this.flyout.hide();
  }

  add() {
    this.selectedProduct = new Product();
    this.flyout.show();
  }

  showSearchView() {
    this.flyoutView = 'search';
    this.flyout.show().then(() => {
      this.productSearchView.focus();
    });
  }

  onFlyoutHide() {
    this.flyoutView = '';
  }
}
