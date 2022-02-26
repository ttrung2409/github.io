import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, HostListener, Inject, ElementRef, ViewEncapsulation } from '@angular/core';
import Customer from '../../../models/customer';
import { GridColumn, GridComponent } from '../../../widgets/grid/grid.component';
import CustomerService from '../../../services/customer.service';
import { Subscription, fromEvent } from 'rxjs';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import { Key } from 'ts-keycode-enum';
import { CustomerComponent } from '../customer/customer.component';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';
import { MatDialog, PageEvent } from '@angular/material';
import { ConfirmDialogComponent } from 'web/src/app/widgets/confirm-dialog/confirm-dialog.component';
import DialogResult from 'web/src/app/valueObjects/DialogResult';
import { APP_CONFIG } from 'web/src/app/app.config';
import SearchModel from 'web/src/app/models/search';
import { NotifierService } from 'angular-notifier';

declare var $: any;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    @Inject(APP_CONFIG) config,
    private el: ElementRef,
    private notifier: NotifierService) {
    this.searchModel = new SearchModel({
      orderBy: 'no',
      isDesc: true,
      index: 1,
      size: config.size
    });

    this.config = config;
  }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild('searchView') searchView: CustomerSearchComponent;
  @ViewChild('customerView') customerView: CustomerComponent;
  @ViewChild('grid') grid: GridComponent;

  customers: Customer[];
  selectedCustomer: Customer = new Customer();
  flyoutView: string;
  searchModel: SearchModel = new SearchModel();
  isLoading: boolean;
  config: any;
  total: number;

  columns: GridColumn[] = [
    new GridColumn({
      caption: 'Mã KH',
      field: 'no',
      width: '15%',
      sortable: true
    }),
    new GridColumn({
      caption: 'Tên KH',
      field: 'name',
      width: '25%',
      sortable: true
    }),
    new GridColumn({
      caption: 'Loại KH',
      field: 'type.name',
      width: '10%',
      sortable: true
    }),
    new GridColumn({
      caption: 'Số ĐT',
      field: 'phone',
      width: '15%',
      sortable: true
    }),
    new GridColumn({
      caption: 'Địa chỉ',
      field: 'address'
    })
  ];

  ngOnInit() {
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
    $(this.el.nativeElement).find('.customer-list').focus();
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
    this.flyout.show();
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
            this.notifier.notify('success', 'Xóa thành công');
            this.search(this.searchModel);
          });
        }
      });
  }

  height() {
    return $(window).height() - $('.toolbar').outerHeight(true) - $('.mat-paginator-container').outerHeight(true);
  }

  getRowClass(customer) {
    return !!customer.deletedAt ? 'deleted' : '';
  }
}
