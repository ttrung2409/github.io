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
import SearchModel from '../../../models/search';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  private _searchModel: SearchModel = new SearchModel({ orderBy: 'no' });

  constructor(private productService: ProductService) {
  }

  columns: GridColumn[];
  products: Product[];
  selectedProduct: Product = new Product();
  flyoutView: string;
  total: number;
  isLoading: boolean;
  
  @ViewChild(FlyoutComponent) flyout: FlyoutComponent;
  @ViewChild('productView') productView: ProductComponent;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('productSearchView') productSearchView: ProductSearchComponent;

  ngOnInit() {
    this.columns = [
      new GridColumn({
        caption: 'Mã SP',
        field: 'no',
        sortable: true
      }),
      new GridColumn({
        caption: 'Tên SP',
        field: 'name',
        sortable: true
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'uom',
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá nhập',
        field: 'cost',
        isNumber: true,
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá lẻ',
        field: 'retailPrice',
        isNumber: true,
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá sỉ',
        field: 'wholeSalePrice',
        isNumber: true,
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá khuyến mãi',
        field: 'discountPrice',
        isNumber: true,
        sortable: true
      })
    ];

    this.onSearch();

    this._subscription.add(fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => {
      switch (event.keyCode) {
        case Key.F2:
          this.showSearchView();          
          break;
      }
    }));
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

  onSearch(params?: any) {
    this._searchModel.currentPage = 1;
    this.isLoading = true;
    this._subscription.add(this.productService.search(Object.assign(this._searchModel, params)).subscribe(result => {
      this.isLoading = false;
      this.total = result.total;
      this.products = result.items;
    }));

    this.flyout.hide();
  }

  add() {
    this.selectedProduct = new Product();
    this.flyoutView = 'product';
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


  onCommit() {
    this.onSearch(this._searchModel);
    this.flyout.hide();
  }

  onSortChange({ orderBy, isDesc }) {
    this._searchModel = Object.assign(this._searchModel, { orderBy, isDesc });
    this.onSearch();
  }
}
