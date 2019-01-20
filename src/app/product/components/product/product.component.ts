import { Component, OnInit, Input, SimpleChanges, OnChanges, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import ProductService from '../../../services/product.service';
import Product from '../../../models/product';
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import UtilsService from '../../../services/utils.service';
import v8n from "v8n";

declare var $: any;

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(private productService: ProductService, public utils: UtilsService) { }

  @Input() id: number;
  @ViewChild('productBarcodeInput') productBarcodeInput: ElementRef;

  @Output() cancel = new EventEmitter();
  @Output() commit = new EventEmitter();

  product: Product = new Product();
  categories: any[];
  uoms: any[];
  errors: Map<string, boolean> = new Map();

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {    
    switch (e.keyCode) {
      case Key.Escape:        
        this.doCancel();
        break;
      case Key.F9:
        this.save();
        break;
    }
  };

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
    this.productService.getUoms().subscribe(uoms => this.uoms = uoms);
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
    if (this.validate()) {
      this.productService.save(this.product).subscribe(() => {
        this.commit.emit();
      });
    }              
  }

  validate(): boolean {
    this.errors.clear();    
    if (v8n().empty().test(this.product.name)) {
      this.errors.set('name', true);
    }

    return this.errors.size == 0;
  }

  doCancel() {
    this.cancel.emit();
  }

  focus() {
    $(this.productBarcodeInput.nativeElement).focus();
  } 
}

