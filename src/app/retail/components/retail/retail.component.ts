import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, ElementRef, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { GridColumn, GridComponent } from '../../../widgets/grid/grid.component';
import Invoice from '../../../models/invoice';
import InvoiceItem from '../../../models/invoiceItem';
import Product from '../../../models/product';
import { Subscription, fromEvent } from 'rxjs';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import { Key } from 'ts-keycode-enum'
import { Guid } from 'guid-typescript'
import { ProductLookupComponent } from '../../../widgets/product-lookup/product-lookup.component';
import { QtyEditorComponent } from '../qty-editor/qty-editor.component';
import { PaymentComponent } from '../payment/payment.component';
import UtilsService from '../../../services/utils.service';
import { MatDialog } from '@angular/material';
import { NoProductFoundDialog } from '../no-product-found-dialog/no-product-found-dialog.component';
declare var _: any;
declare var $: any;

@Component({
  selector: 'retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RetailComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef, private utils: UtilsService, private dialog: MatDialog) {
  }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild('productLookup') productLookup: ProductLookupComponent;
  @ViewChild('qtyEditor') qtyEditor: QtyEditorComponent;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('paymentView') paymentView: PaymentComponent;

  columns: GridColumn[];
  invoice: Invoice = new Invoice({ customerId: 1 });  
  selectedProductId: number;
  selectedIndex: number;
  selectedItem: InvoiceItem = new InvoiceItem();
  flyoutView: string;

  ngOnInit() {
    this.columns = [
      new GridColumn({
        caption: 'STT',
        field: 'index',
        width: '100px'
      }),
      new GridColumn({
        caption: 'Tên sản phẩm',
        field: 'product.name'        
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'product.uom',
        width: '100px'
      }),
      new GridColumn({
        caption: 'SL',
        field: 'qty',
        width: '100px'
      }),
      new GridColumn({
        caption: 'Giá',
        field: 'price',
        width: '180px',
        footer: 'Tổng'
      }),
      new GridColumn({
        caption: 'Thành tiền',
        field: 'total',
        width: '200px',
        footer: function () {
          return this.utils.formatNumber(this.invoice.items.reduce((acc, item) => acc += item.total, 0));
        }.bind(this)
      })
    ];

    this._subscription = fromEvent(document, 'keyup').subscribe((e: KeyboardEvent) => {
      switch (e.keyCode) {
        case Key.F2:
          this.pay();
          break;
      }

      switch (e.key) {
        case '+':
          this.invoice.items[this.selectedIndex].qty++;
          break;
        case '-':
          this.invoice.items[this.selectedIndex].qty = Math.max(0, this.invoice.items[this.selectedIndex].qty - 1);
          break;        
      }
    });
  }

  ngAfterViewInit() {
    this.productLookup.focus();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  addItem(product: Product) {    
    if (!!product) {
      this.invoice.items.push(new InvoiceItem({
        id: Guid.create().toString(),
        productId: product.id,
        product: product,
        qty: 1,
        price: product.retailPrice,
        index: this.invoice.items.length + 1
      }));

      this.selectedIndex = this.invoice.items.length - 1;
    }
    else {
      this.dialog.open(NoProductFoundDialog);              
    }
  }

  onKeydown(event: KeyboardEvent) {    
    this.grid.handleKeyEvent(event);
  }

  onSelect(item: InvoiceItem) {
    if (!!item) {
      this.selectedItem = _.cloneDeep(item);
      this.flyoutView = 'qtyEditor';
      this.flyout.show().then(() => {
        this.qtyEditor.focus();
      });
    }   
  }

  onDelete(item: InvoiceItem) {
    this.invoice.items = this.invoice.items.filter(x => x.id != item.id);
    let index = 1;
    for (let item of this.invoice.items) {
      item.index = index++;
    }

    this.selectedIndex = Math.min(this.invoice.items.length - 1, this.selectedIndex);    
  }  

  pay() {
    this.flyoutView = 'payment';
    this.flyout.show().then(() => {
      this.paymentView.focus();
    });
  }

  onItemChange(item) {
    this.productLookup.focus();
    this.productLookup.clear();
    this.flyout.hide();
    this.invoice.items = this.invoice.items.map(x => x.id == item.id ? item : x);              
  }

  onPay() {    
    this.flyout.hide();
    this.productLookup.focus();
    this.productLookup.clear();    
    this.new();    
  }

  new() {
    this.invoice = new Invoice({ customerId: 1 });
  }
}
