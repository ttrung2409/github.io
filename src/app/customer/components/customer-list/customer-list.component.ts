import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import Customer from '../../../models/customer';
import { GridColumn } from '../../../widgets/grid/grid.component';
import CustomerService from '../../../services/customer.service';
import { Subscription, fromEvent } from 'rxjs';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import { Key } from 'ts-keycode-enum';
import { CustomerComponent } from '../customer/customer.component';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  constructor(private customerService: CustomerService) { }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild('searchView') searchView: CustomerSearchComponent;
  @ViewChild('customerView') customerView: CustomerComponent;

  customers: Customer[];
  selectedCustomer: Customer = new Customer();
  flyoutView: string;

  columns: GridColumn[] = [    
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
      field: 'phoneNumber'
    }),
    new GridColumn({
      caption: 'Email',
      field: 'email'
    }),
    new GridColumn({
      caption: 'Địa chỉ',
      field: 'address'
    })
  ];

  ngOnInit() {
    this._subscription.add(this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    }));

    this._subscription.add(fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
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

  onSelect(customer) {
    this.selectedCustomer = customer;
    this.flyoutView = 'customer';    
    this.flyout.show().then(() => {
      this.customerView.focus();
    });
  }

  onSearch(model) {
    this.flyout.hide();    
  }

  showSearchView() {
    this.flyoutView = 'search';
    this.flyout.show().then(() => {
      this.searchView.focus();
    });
  }
}
