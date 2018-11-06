import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Product from '../../models/product';
import ProductService from '../../services/product.service';
import { BindableComponent } from '../bindable.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-lookup',
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.scss']
})
export class ProductLookupComponent extends BindableComponent implements OnInit, OnChanges {
  private _subscription: Subscription;
  private _enter: boolean;

  constructor(private productService: ProductService) {
    super();
  }
  
  @Input() direction: string = 'auto';
  @Output() select = new EventEmitter();

  isLoading: boolean = false;
  products: Product[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.model && changes.model.currentValue != changes.model.previousValue) {
      this.select.emit(this.products.find(x => x.id == this.model));
    }
  }

  ngOnInit() {   
  }

  onSearch(query) {
    this.isLoading = true;
    this.products = [];
    if (!!this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }

    this._subscription = this.productService.lookup(query).subscribe((products: Product[]) => {
      this.products = products;
      this.isLoading = false;
      if (!!this._enter) {
        if (this.products.length == 1) {
          this.select.emit(this.products[0]);
        }
        else {
          this.select.emit(null);
        }
      }
    });
  }

  onKeyup(event) {
    if (event.keyCode == 13) {
      this._enter = true;
    }    
  }
}
