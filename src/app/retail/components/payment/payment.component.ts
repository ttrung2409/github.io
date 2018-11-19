import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import RetailService from '../../../services/retail.service';
import Customer from '../../../models/customer';
import CustomerService from '../../../services/customer.service';
import { Subscription, fromEvent, Observable } from 'rxjs';
import Invoice from '../../../models/invoice';
import { TypeaheadComponent } from '../../../widgets/typeahead/typeahead.component';
import { Key } from 'ts-keycode-enum';
import Payment from '../../../models/payment';
import UtilsService from '../../../services/utils.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {
  private _customerSubscription: Subscription;

  constructor(private retailService: RetailService, private customerService: CustomerService) {
  }

  @Input() invoice: Invoice;  
  @Output() complete = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('customerLookup') customerLookup: TypeaheadComponent;

  customers: Customer[] = [];
  payment: Payment = new Payment(); 

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.doCancel();
        break;
      case Key.F4:
        this.doComplete();
        break;
    }
  };
  ngOnInit() {    
  }

  ngOnChanges(changes: SimpleChanges) {   
  }    

  onSearch(query) {
    if (!!this._customerSubscription) {
      this._customerSubscription.unsubscribe();
      this._customerSubscription = null;
    }

    this._customerSubscription = this.customerService.lookup(query).subscribe(customers => {
      this.customers = customers;
    });
  }

  focus() {
    this.customerLookup.focus();
  }

  doCancel() {
    this.cancel.emit();
  }

  doComplete() {
    this.complete.emit();
  }

  requestForCustomer(id): Observable<any> {
    return this.customerService.getCustomer(id);
  }
}
