import { Component, OnInit, OnDestroy, ViewChild, HostListener, Inject } from '@angular/core';
import Customer from '../../../models/customer';
import { GridColumn, GridComponent } from '../../../widgets/grid/grid.component';
import CustomerService from '../../../services/customer.service';
import { Subscription, fromEvent } from 'rxjs';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import { Key } from 'ts-keycode-enum';
import { CustomerComponent } from '../customer/customer.component';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';
import { MatDialog, PageEvent } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/widgets/confirm-dialog/confirm-dialog.component';
import DialogResult from 'src/app/valueObjects/DialogResult';
import { APP_CONFIG } from 'src/app/app.config';
import SearchModel from 'src/app/models/search';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    @Inject(APP_CONFIG) config) {
    this.defaultSearch = new SearchModel({
      orderBy: 'no',
      isDesc: true,
      index: 1,
      size: config.size
    });

    this.searchModel = new SearchModel(this.defaultSearch);
    this.config = config;
  }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild('searchView') searchView: CustomerSearchComponent;
  @ViewChild('customerView') customerView: CustomerComponent;
  @ViewChild('grid') grid: GridComponent;

  customers: Customer[]; 
  selectedCustomer: Customer = new Customer();
  flyoutView: string;
  defaultSearch: SearchModel = new SearchModel();
  searchModel: SearchModel = new SearchModel();
  isLoading: boolean;
  config: any;
  total: number;

  columns: GridColumn[] = [
    new GridColumn({
      caption: 'Mã KH',
      field: 'no'
    }),
    new GridColumn({
      caption: 'Tên KH',
      field: 'name'
    }),
    new GridColumn({
      caption: 'Loại KH',
      field: 'type.name',
    }),
    new GridColumn({
      caption: 'Số ĐT',
      field: 'phone'
    }),
    new GridColumn({
      caption: 'Email',
      field: 'email'
    })    
  ];

  ngOnInit() {
    this.onSearch();
    this._subscription.add(fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
      switch (event.keyCode) {
        case Key.F2:
          this.add();
          break;
      }
    }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  add() {
    this.selectedCustomer = new Customer();
    this.flyoutView = 'customer';
    this.flyout.show();
  }

  onSelect(customer) {
    this.selectedCustomer = customer;
    this.flyoutView = 'customer';    
    this.flyout.show().then(() => {
      this.customerView.focus();
    });
  }

  onSearch(params?: any) {
    this.search(Object.assign(this.searchModel, params, { index: 1 }));
    this.flyout.hide();
  }

  onFlyoutShow() {
    this.grid.disableHotkeys();
  }

  onFlyoutHide() {
    this.flyoutView = '';
    this.grid.enableHotkeys();
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
    this._subscription.add(this.customerService.search(searchModel).subscribe(result => {
      this.isLoading = false;
      this.total = result.total;
      this.customers = result.items;
    }));
  }

  onPageChanged(event: PageEvent) {
    this.search(Object.assign(this.searchModel, { index: event.pageIndex + 1 }));
  } 

  showSearchView() {
    this.flyoutView = 'search';
    this.flyout.show().then(() => {
      this.searchView.focus();
    });
  }

  onDelete(customer) {
    this.grid.disableHotkeys();    
    this.dialog.open(ConfirmDialogComponent,
      { data: { msg: 'Bạn có chắc chắn xóa khách hàng này?' } })
      .afterClosed()
      .subscribe(result => {
        this.grid.enableHotkeys();
        if (result == DialogResult.OK) {
          this.customerService.delete(customer.id).subscribe(() => {
            this.search(this.searchModel);
          });
        }
      });    
  }
}
