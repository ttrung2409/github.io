import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import CustomerService from '../../../services/customer.service';
import { Key } from 'ts-keycode-enum';
declare var $: any;

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  @Output() cancel = new EventEmitter();
  @Output() search = new EventEmitter();

  @ViewChild('customerNoInput') customerNoInput: ElementRef;

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.doCancel();
        break;
      case Key.F9:
        this.doSearch();
        break;
    }
  }

  model: any = {};
  customerTypes: any[];

  ngOnInit() {
    this.customerService.allTypes().subscribe(types => this.customerTypes = types);
  }

  focus() {
    $(this.customerNoInput.nativeElement).focus();
  }

  doCancel() {
    this.cancel.emit();
  }

  doSearch() {
    this.search.emit();
  }
}
