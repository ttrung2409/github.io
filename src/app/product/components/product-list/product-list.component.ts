import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy, ElementRef, Inject, AfterViewInit } from '@angular/core';
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
import { PageEvent, MatDialog } from '@angular/material';
import { APP_CONFIG } from 'src/app/app.config';
import { ConfirmDialogComponent } from 'src/app/widgets/confirm-dialog/confirm-dialog.component';
import DialogResult from 'src/app/valueObjects/DialogResult';
import { NotifierService } from 'angular-notifier';

declare var $: any;

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscription: Subscription = new Subscription();  

  constructor(
    private productService: ProductService,
    @Inject(APP_CONFIG) config,
    private el: ElementRef,
    private dialog: MatDialog,
    private notifier: NotifierService) {
    this.config = config;    
    this.searchModel = new SearchModel({
      orderBy: 'no',
      isDesc: true,
      index: 1,
      size: config.size
    });
  }

  columns: GridColumn[];
  products: Product[];
  selectedProduct: Product = new Product();
  flyoutView: string;
  total: number;
  isLoading: boolean; 
  searchModel: SearchModel = new SearchModel();
  config: any;
  
  @ViewChild(FlyoutComponent) flyout: FlyoutComponent;
  @ViewChild('productView') productView: ProductComponent;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('productSearchView') productSearchView: ProductSearchComponent;

  ngOnInit() {
    this.columns = [
      new GridColumn({
        caption: 'Mã SP',
        field: 'no',
        width: '15%',
        sortable: true
      }),
      new GridColumn({
        caption: 'Tên SP',
        field: 'name',
        width: '30%',
        sortable: true
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'uom.name',
        width: '10%',
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá nhập',
        field: 'cost',
        isNumber: true,
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá sỉ',
        field: 'wholesalePrice',
        isNumber: true,
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá KM',
        field: 'discountPrice',
        isNumber: true,
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá lẻ',
        field: 'retailPrice',
        isNumber: true,
        sortable: true
      })          
    ];

    this.onSearch();

    this._subscription.add(fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
      switch (event.keyCode) {
        case Key.F2:
          this.add();          
          break;
        case Key.F7:
          this.showSearchView();
          break;
      }
    }));    
  }

  ngAfterViewInit() {  
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

  onDelete(product: Product) {
    this.grid.disableHotkeys();
    this.dialog.open(ConfirmDialogComponent,
      { data: { msg: 'Bạn có chắc chắn xóa sản phẩm này?' } })
      .afterClosed()
      .subscribe(result => {
        this.grid.enableHotkeys();
        if (result == DialogResult.OK) {
          this.productService.delete(product.id).subscribe(() => {
            this.notifier.notify('success', 'Xóa thành công');
            this.search(this.searchModel);            
          });
        }
      });    
  }

  onSearch(params?: any) {    
    this.search(Object.assign(this.searchModel, params, { index: 1 }));
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

  onFlyoutShow() {
    this.grid.disableHotkeys();
  }

  onFlyoutHide() {
    this.flyoutView = '';
    this.grid.enableHotkeys();
    $(this.el.nativeElement).find('.product-list').focus();
  }

  onCommit() {
    this.search(this.searchModel);
    this.flyout.hide();
  }

  onSortChange({ orderBy, isDesc }) {
    this.search(Object.assign(this.searchModel, { orderBy, isDesc }));
  }

  search(searchModel) {
    this.isLoading = true;        
    this._subscription.add(this.productService.search(searchModel).subscribe(result => {
      this.isLoading = false;
      this.total = result.total;
      this.products = result.items;      
    }));
  }

  onPageChanged(event: PageEvent) {
    this.search(Object.assign(this.searchModel, { index: event.pageIndex + 1 }));
  }

  height() {
    return $(window).height() - $('.toolbar').outerHeight(true) - $('.mat-paginator-container').outerHeight(true);
  }

  getRowClass(product) {
    return !!product.deletedAt ? 'deleted' : '';
  }
}
