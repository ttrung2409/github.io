import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import InvoiceItem from '../../../models/invoiceItem';
declare var $: any;

@Component({
  selector: 'qty-editor',
  templateUrl: './qty-editor.component.html',
  styleUrls: ['./qty-editor.component.scss']
})
export class QtyEditorComponent implements OnInit {
  constructor() { }

  @Input() item: InvoiceItem;
  @Output() commit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('qtyInput') qtyInput: ElementRef;

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.doCancel();
        break;
      case Key.F4:
        this.save();
        break;
    }

    switch (e.key) {
      case 'l':
        this.item.price = this.item.product.retailPrice;
        break;
      case 's':
        this.item.price = this.item.product.wholeSalePrice;
        break;
      case 'k':
        this.item.price = this.item.product.discountPrice;
        break;
    }
  };

  ngOnInit() {   
  }  

  doCancel() {
    this.cancel.emit();
  }

  save() {
    this.commit.emit(this.item);    
  }

  focus() {
    $(this.qtyInput.nativeElement).focus();
  }
}
