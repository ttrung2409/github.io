import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output, Input } from '@angular/core';
import CustomerService from '../../../services/customer.service';
import { Key } from 'ts-keycode-enum';
import UtilsService from 'src/app/services/utils.service';
import * as _ from 'lodash'
declare var $: any;

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit, AfterViewInit {

  constructor(private customerService: CustomerService, private utils: UtilsService) { }

  @Output() cancel = new EventEmitter();
  @Output() search = new EventEmitter();

  @ViewChild('customerNoInput') customerNoInput: ElementRef;

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.doCancel();
        break;
      case Key.Enter:
        this.doSearch();
        break;
    }
  }

  model: any = { no: null, name: null, phone: null, typeId: null, email: null, includeDeleted: false };
  customerTypes: any[];

  ngOnInit() {
    this.customerService.allTypes().subscribe(types => this.customerTypes = types);
  }

  ngAfterViewInit() {
    setTimeout(() => this.focus());
  }

  focus() {
    $(this.customerNoInput.nativeElement).focus();
  }

  doCancel() {
    this.cancel.emit();
  }

  doSearch() {
    this.search.emit(this.model);
  }

  clear() {
    this.model = this.utils.empty(this.model);
  }
}
