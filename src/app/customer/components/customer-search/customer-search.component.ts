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
export class CustomerSearchComponent implements OnInit {

  constructor(private customerService: CustomerService, private utils: UtilsService) { }

  @Input() model: any = {};
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
    this.search.emit(Object.assign(this.model, { index: 1 }));
    this.clear();
  }

  clear() {
    let { index, size, orderBy, isDesc } = this.model;
    this.model = Object.assign(this.utils.empty(this.model), _.pickBy({ index, size, orderBy, isDesc }, value => value !== undefined));
  }
}
