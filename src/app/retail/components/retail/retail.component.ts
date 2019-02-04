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
import RetailService from '../../../services/retail.service';
import { AddCustomerDialog } from '../add-customer-dialog/add-customer-dialog.component';
import { TypeaheadComponent } from 'src/app/widgets/typeahead/typeahead.component';
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

  constructor(
    private retailService: RetailService,
    private dialog: MatDialog,
    private utils: UtilsService,
    private el: ElementRef) {
  }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild('productLookup') productLookup: ProductLookupComponent;
  @ViewChild('qtyEditor') qtyEditor: QtyEditorComponent;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('paymentView') paymentView: PaymentComponent;
  @ViewChild('searchInput') searchInput: TypeaheadComponent;

  columns: GridColumn[];
  invoice: Invoice = new Invoice({ customerId: 1 });  
  selectedProductId: number;
  selectedIndex: number;
  selectedItem: InvoiceItem = new InvoiceItem();
  flyoutView: string;
  searching: boolean = false;

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
        isNumber: true,
        footer: 'Tổng'
      }),
      new GridColumn({
        caption: 'Thành tiền',
        field: 'total',
        width: '200px',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.invoice.items.reduce((acc, item) => acc += item.total, 0));
        }.bind(this)
      })
    ];

    this._subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      switch (e.keyCode) {
        case Key.F2:
          this.new();
          break;
        case Key.F4:
          this.pay();
          break;
        case Key.F7:
          this.addCustomer();
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
      this.grid.disableHotkeys();
      this.dialog.open(NoProductFoundDialog).afterClosed().subscribe(() => {
        this.grid.enableHotkeys();
      });              
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
    this.flyout.hide();    
    this.invoice.items = this.invoice.items.map(x => x.id == item.id ? item : x);              
  }

  onPaymentComplete() {    
    this.flyout.hide();
    this.retailService.save(this.invoice);
    this.new();    
  }

  new() {
    this.invoice = new Invoice({ customerId: 1 });
  }

  onFlyoutShow() {
    this.grid.disableHotkeys();
  }

  onFlyoutHide() {
    this.flyoutView = '';
    this.productLookup.focus();
    this.productLookup.clear();
    this.grid.enableHotkeys();
  }

  addCustomer() {
    this.dialog.open(AddCustomerDialog);
  }

  showSearch() {
    let _this = this;
    $(this.el.nativeElement).find('.actions').fadeOut(100, function () {
      _this.searching = true;
      setTimeout(() => {
        $(_this.el.nativeElement).find('.toolbar-search .dropdown-container').animate({ width: 400 }, 100, function () {
          _this.searchInput.focus();
        });
      });          
    });    
  }

  hideSearch() {
    this.searching = false;
    $(this.el.nativeElement).find('.actions').fadeIn(100);
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.keyCode == Key.Escape) {
      this.hideSearch();
    }
  }
}
