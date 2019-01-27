import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter, OnDestroy, HostListener, Inject } from '@angular/core';
import RetailService from '../../../services/retail.service';
import Customer from '../../../models/customer';
import CustomerService from '../../../services/customer.service';
import { Subscription, fromEvent, Observable } from 'rxjs';
import Invoice from '../../../models/invoice';
import { TypeaheadComponent } from '../../../widgets/typeahead/typeahead.component';
import { Key } from 'ts-keycode-enum';
import Payment from '../../../models/payment';
import UtilsService from '../../../services/utils.service';
import { APP_GLOBAL } from 'src/app/app.global';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {
  private _customerSubscription: Subscription;
  private _global;

  constructor(
    private retailService: RetailService,
    private customerService: CustomerService,
    @Inject(APP_GLOBAL) global) {
    this._global = global;
  }

  @Input() invoice: Invoice;  
  @Output() complete = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('customerLookup') customerLookup: TypeaheadComponent;

  customers: Customer[] = [];
  payment: Payment = new Payment(); 

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    if (!this._global.lockHotkeys) {
      switch (e.keyCode) {
        case Key.Escape:
          this.doCancel();
          break;
        case Key.F9:
          this.doComplete();
          break;
      }
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
    return this.customerService.get(id);
  }
}
