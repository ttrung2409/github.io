import { Component, OnInit, Output, EventEmitter, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import Category from '../../../models/category';
import ProductService from '../../../services/product.service';
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';
declare var $: any;

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  constructor(private productService: ProductService) { }

  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();

  model: any = {};
  categories: Category[];  

  @ViewChild('productNoInput') productNoInput: ElementRef;

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.doCancel();
        break;
      case Key.F4:
        this.doSearch();
        break;
    }
  };

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);   
  }

  doSearch() {
    this.search.emit(this.model);
  }

  doCancel() {
    this.cancel.emit();
  }

  focus() {
    $(this.productNoInput.nativeElement).focus();
  }
}
