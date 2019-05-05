import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Product from '../../models/product';
import ProductService from '../../services/product.service';
import { BindableComponent } from '../bindable.component';
import { Subscription, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Key } from 'ts-keycode-enum';
import { TypeaheadComponent } from '../typeahead/typeahead.component';
import * as _ from 'lodash'
import UtilsService from 'src/app/services/utils.service';

declare var $: any;

@Component({
  selector: 'product-lookup',
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.scss']
})
export class ProductLookupComponent extends BindableComponent implements OnInit, OnChanges, OnDestroy {
  private _subscription: Subscription = new Subscription();
  private _lastKey: number = -1;
  private _subscriptionForScanner: Subscription = new Subscription();
  private _showing: boolean;

  constructor(private el: ElementRef, private productService: ProductService, private utils: UtilsService) {
    super();
  }
  
  @Input() direction: string = 'auto';
  @Input() clearOnSelect: boolean = false;
  @Input() showNoResults: boolean = true;
  @Input() preventKeys: string[] = [];
  @Input() priceType = 'retail';
  @Output('select') selectEvent = new EventEmitter();
  @Output('keydown') keydownEvent = new EventEmitter();

  @ViewChild('typeahead') typeahead: TypeaheadComponent;

  isLoading: boolean = false;
  products: Product[] = [];  

  ngOnChanges(changes: SimpleChanges) {   
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscriptionForScanner.unsubscribe();
    this._subscription.unsubscribe();
  }

  onSearch(query) {    
    this.isLoading = true;
    this.products = [];
    if (this._lastKey == Key.Enter) {
      this._subscriptionForScanner.add(this.productService.lookup(query).subscribe((products: Product[]) => {
        this.isLoading = false;
        this.selectEvent.emit(products.length > 0 ? products[0] : null);        
      }));
    }
    else {
      if (!!this._subscription) {
        this._subscription.unsubscribe();        
      }

      this._subscription = this.productService.lookup(query, { priceType: this.priceType }).subscribe((products: Product[]) => {
        this.products = products;
        this.isLoading = false;
        setTimeout(() => this.show());
      });
    }    
  }
  
  onKeydown(event) {        
    this._lastKey = event.keyCode;
    if (event.keyCode == Key.Enter) {
      setTimeout(() => {      
        let $input = $(this.el.nativeElement.querySelector('input.search'));
        if (!!$input.val()) {
          this.onSearch($input.val());
        }

        if (!!this.clearOnSelect) {
          this.clear();
        }        
      });      
    }

    if (!this._showing && (event.keyCode == Key.UpArrow
      || event.keyCode == Key.DownArrow
      || event.keyCode == Key.Enter
      || event.keyCode == Key.Delete)) {
      this.keydownEvent.emit(event); 
    }    
  }

  onSelect(value) {
    if (this.products.some(x => x.id == value)) {
      this.selectEvent.emit(this.products.find(x => x.id == value));
    }
  }

  focus() {
    this.typeahead.focus();
  }

  clear() {   
    this.typeahead.clear();
  }

  show() {
    this.typeahead.show();
  }

  hide() {
    this.typeahead.hide();
  }

  onShow() {
    this._showing = true;
  }

  onHide() {
    this._showing = false;
    this.products = [];
  }

  requestForProduct(id): Observable<any> {
    return this.productService.get(id);
  }

  getPrice(item) {
    return this.utils.formatNumber(this.priceType == 'retail' ? item.retailPrice
      : this.priceType == 'wholesale' ? item.wholesalePrice
        : this.priceType == 'discount' ? item.discountPrice : item.retailPrice);
  }
}
