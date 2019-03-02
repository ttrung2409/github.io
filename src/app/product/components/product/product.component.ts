import { Component, OnInit, Input, SimpleChanges, OnChanges, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy, HostListener, Inject } from '@angular/core';
import ProductService from '../../../services/product.service';
import Product from '../../../models/product';
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import UtilsService from '../../../services/utils.service';
import v8n from "v8n";
import { APP_GLOBAL } from 'src/app/app.global';
import { NotifierService } from 'angular-notifier';
import ProductSpec from 'src/app/models/productSpec';

declare var $: any;

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {
  private _global: any;

  constructor(
    private productService: ProductService,
    private utils: UtilsService,
    @Inject(APP_GLOBAL) global,
    private notifier: NotifierService) {
    this._global = global;
  }

  @Input() id: number;
  @ViewChild('productBarcodeInput') productBarcodeInput: ElementRef;

  @Output() cancel = new EventEmitter();
  @Output() commit = new EventEmitter();

  product: Product = new Product();
  categories: any[];
  uoms: any[];
  errors: Map<string, string> = new Map();

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    if (!this._global.lockHotkeys) {
      switch (e.keyCode) {
        case Key.Escape:
          this.doCancel();
          break;
        case Key.F9:
          this.save();
          break;
      }
    }    
  };

  ngOnInit() {
    this.productService.allCategories().subscribe(categories => this.categories = categories);
    this.productService.allUoms().subscribe(uoms => this.uoms = uoms);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.id) {
      let id = changes.id.currentValue;
      if (id > 0) {
        this.productService.get(id).subscribe(x => {
          x.spec = x.spec || new ProductSpec();
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
        this.notifier.notify('success', 'Lưu thành công');
        this.commit.emit();
      });
    }              
  }

  validate(): boolean {
    this.errors.clear();
    if (v8n().empty().test(this.product.name || '')) {
      this.errors.set('name', 'Vui lòng nhập tên sản phẩm');
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

