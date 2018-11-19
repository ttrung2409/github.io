import { Component, OnInit, Input, SimpleChanges, OnChanges, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import ProductService from '../../../services/product.service';
import Product from '../../../models/product';
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import UtilsService from '../../../services/utils.service';
declare var $: any;

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(private productService: ProductService, public utils: UtilsService) { }

  @Input() id: number;
  @ViewChild('productNoInput') productNoInput: ElementRef;

  @Output() complete = new EventEmitter();

  product: Product = new Product();
  categories: any[];
  uoms: any[];

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.cancel();
        break;
      case Key.F4:
        this.save();
        break;
    }
  };

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
    this.productService.getUOMs().subscribe(uoms => this.uoms = uoms);  
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.id) {
      let id = changes.id.currentValue;
      if (id > 0) {
        this.productService.getProduct(id).subscribe(x => {
          this.product = x;
        });
      }
      else {
        this.product = new Product();
      }
    }    
  }  

  save() {    
    this.productService.save(this.product);
    this.complete.emit();
  }

  cancel() {
    this.complete.emit();
  }

  focus() {
    $(this.productNoInput.nativeElement).focus();    
  }  
}

