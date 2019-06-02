import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy, ElementRef, ViewChild, HostListener, Input } from '@angular/core';
import Category from '../../../models/category';
import ProductService from '../../../services/product.service';
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import UtilsService from 'src/app/services/utils.service';
import * as _ from 'lodash'
declare var $: any;

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit, AfterViewInit {
  constructor(private productService: ProductService, private utils: UtilsService) { }

  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();

  model: any = {no: null, barcode: null, name: null, categoryId: null, includeDeleted: false};
  categories: Category[];  

  @ViewChild('barcodeInput') barcodeInput: ElementRef;

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.doCancel();
        break;
      case Key.Enter:
        this.doSearch();
        break;
    }
  };

  ngOnInit() {
    this.productService.allCategories().subscribe(categories => this.categories = categories);    
  }

  ngAfterViewInit() {
    setTimeout(() => this.focus());
  }

  doSearch() {    
    this.search.emit(this.model);    
  }

  doCancel() {    
    this.cancel.emit();    
  }

  focus() {
    $(this.barcodeInput.nativeElement).focus();
  }

  clear() {    
    this.model = this.utils.empty(this.model);
  }
}
