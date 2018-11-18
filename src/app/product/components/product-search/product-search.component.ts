import { Component, OnInit, Output, EventEmitter, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
export class ProductSearchComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  constructor(private productService: ProductService) { }

  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();

  model: any = {};
  categories: Category[];
  states: any[] = [{ value: 1, text: 'Hoạt động' }, { value: 0, text: 'Không hoạt động' }]

  @ViewChild('productNoInput') productNoInput: ElementRef;

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
    this._subscription = fromEvent(document, 'keyup').subscribe((e: KeyboardEvent) => {
      switch (e.keyCode) {
        case Key.Escape:
          this.doCancel();
          break;
        case Key.F4:
          this.doSearch();
          break;
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
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
