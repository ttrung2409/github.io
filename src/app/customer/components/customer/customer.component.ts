import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, HostListener, Output } from '@angular/core';
import Customer from '../../../models/customer';
import CustomerService from '../../../services/customer.service';
import { Key } from 'ts-keycode-enum';
declare var $: any;

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  constructor(private customerService: CustomerService) { }

  @Input() id: number;
  @Output() cancel = new EventEmitter();
  @Output() commit = new EventEmitter();

  @ViewChild('customerNameInput') customerNameInput: ElementRef;

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.doCancel();
        break;
      case Key.F4:
        this.save();
        break;
    }
  }

  customer: Customer = new Customer();
  customerTypes: any[];

  ngOnInit() {
    this.customerService.getCustomer(this.id).subscribe(customer => this.customer = customer);
    this.customerService.getCustomerTypes().subscribe(types => this.customerTypes = types);
  }

  focus() {
    $(this.customerNameInput.nativeElement).focus();
  }

  doCancel() {
    this.cancel.emit();
  }

  save() {
    this.customerService.save(this.customer);
    this.commit.emit();
  }
}
