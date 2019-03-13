import { Component, OnInit, Output, EventEmitter, OnDestroy, ElementRef, ViewChild, HostListener, Input } from '@angular/core';
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
export class ProductSearchComponent implements OnInit {
  constructor(private productService: ProductService, private utils: UtilsService) { }

  @Input() model: any = {};
  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
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

  doSearch() {    
    this.search.emit(Object.assign(this.model, { index: 1 }));
    this.clear();
  }

  doCancel() {    
    this.cancel.emit();    
  }

  focus() {
    $(this.barcodeInput.nativeElement).focus();
  }

  clear() {
    let { index, size, orderBy, isDesc } = this.model;
    this.model = Object.assign(this.utils.empty(this.model), _.pickBy({ index, size, orderBy, isDesc }, value => value !== undefined));
  }
}
