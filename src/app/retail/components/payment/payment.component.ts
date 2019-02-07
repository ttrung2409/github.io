import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter, OnDestroy, HostListener, Inject } from '@angular/core';
import InvoiceService from '../../../services/invoice.service';
import Customer from '../../../models/customer';
import CustomerService from '../../../services/customer.service';
import { Subscription, fromEvent, Observable } from 'rxjs';
import Invoice from '../../../models/invoice';
import { TypeaheadComponent } from '../../../widgets/typeahead/typeahead.component';
import { Key } from 'ts-keycode-enum';
import Payment, { PaymentMethod } from '../../../models/payment';
import UtilsService from '../../../services/utils.service';
import { APP_GLOBAL } from 'src/app/app.global';
import { CustomerLookupComponent } from 'src/app/widgets/customer-lookup/customer-lookup.component';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {
  private _global;

  constructor(
    private invoiceService: InvoiceService,
    @Inject(APP_GLOBAL) global) {
    this._global = global;
  }

  @Input() invoice: Invoice;
  @Output() commit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild(CustomerLookupComponent) customerLookup: CustomerLookupComponent;

  payment: Payment = new Payment();

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    if (!this._global.lockHotkeys) {
      switch (e.keyCode) {
        case Key.Escape:
          this.doCancel();
          break;
        case Key.F9:
          this.doCommit();
          break;
      }
    }    
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.invoice) {
      this.payment = this.invoice.payments.length > 0 ? this.invoice.payments[0] : new Payment({
        invoiceId: this.invoice.id,
        customerId: this.invoice.customerId,
        method: PaymentMethod.Cash
      });      
    }
  }    

  focus() {
    this.customerLookup.focus();
  }

  doCancel() {
    this.cancel.emit();    
  }

  doCommit() {
    this.commit.emit(this.payment);    
  }
}
