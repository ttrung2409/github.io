import { Component, OnInit, ViewChild } from '@angular/core';
import CustomerService from 'src/app/services/customer.service';
import { Subscription, Observable } from 'rxjs';
import Customer from 'src/app/models/customer';
import { BindableComponent } from '../bindable.component';
import { TypeaheadComponent } from '../typeahead/typeahead.component';

@Component({
  selector: 'customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.scss']
})
export class CustomerLookupComponent extends BindableComponent implements OnInit {
  private _subscription: Subscription;

  constructor(private customerService: CustomerService) {
    super();
  }

  @ViewChild(TypeaheadComponent) typeahead: TypeaheadComponent;

  customers: Customer[] = [];
  isLoading: boolean = false;

  ngOnInit() {
  }

  onSearch(query) {
    if (!!this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }

    this.isLoading = true;
    this._subscription = this.customerService.lookup(query).subscribe(customers => {
      this.customers = customers;
      this.isLoading = false;
    });
  }

  requestForCustomer(id): Observable<any> {
    return this.customerService.get(id);
  }

  focus() {
    this.typeahead.focus();
  }
}
