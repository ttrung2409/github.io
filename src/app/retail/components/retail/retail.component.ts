import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, ElementRef, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { GridColumn, GridComponent } from '../../../widgets/grid/grid.component';
import Invoice, { InvoiceStatus } from '../../../models/invoice';
import InvoiceItem from '../../../models/invoiceItem';
import Product from '../../../models/product';
import { Subscription, fromEvent, of } from 'rxjs';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import { Key } from 'ts-keycode-enum'
import { Guid } from 'guid-typescript'
import { ProductLookupComponent } from '../../../widgets/product-lookup/product-lookup.component';
import { QtyEditorComponent } from '../qty-editor/qty-editor.component';
import { PaymentComponent } from '../payment/payment.component';
import UtilsService from '../../../services/utils.service';
import { MatDialog } from '@angular/material';
import { NoProductFoundDialog } from '../no-product-found-dialog/no-product-found-dialog.component';
import InvoiceService from '../../../services/invoice.service';
import { AddCustomerDialog } from '../add-customer-dialog/add-customer-dialog.component';
import { TypeaheadComponent } from 'src/app/widgets/typeahead/typeahead.component';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment'
import * as _ from 'lodash'
import * as $ from 'jquery'
import { NotifierService } from 'angular-notifier';
import Payment, { PaymentMethod } from 'src/app/models/payment';
import CustomerService from 'src/app/services/customer.service';

@Component({
  selector: 'retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RetailComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscription: Subscription;
  private _searchSubscription: Subscription;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private utils: UtilsService,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService) {
  }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild('productLookup') productLookup: ProductLookupComponent;
  @ViewChild('qtyEditor') qtyEditor: QtyEditorComponent;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('paymentView') paymentView: PaymentComponent;
  @ViewChild('searchInput') searchInput: TypeaheadComponent;

  columns: GridColumn[];
  invoice: Invoice = new Invoice();
  selectedProductId: number;
  selectedIndex: number;
  selectedItem: InvoiceItem = new InvoiceItem();
  flyoutView: string;
  searching: boolean = false;
  lockHotkeys: boolean = false;
  isLoading: boolean = false;
  invoices: Invoice[] = [];  

  get canSave() {
    return this.invoice.items.length > 0;
  }

  get canView() {
    return this.invoice.id > 0;
  }

  get canPrint() {
    return this.invoice.id > 0;
  }

  get canPay() {
    return this.invoice.items.length > 0;
  }

  ngOnInit() {
    this.initColumns();
    this._subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      if (!this.lockHotkeys) {
        this.handleHotkey(e);  
      }
    });
    
    this.route.params
      .pipe(switchMap((params: Params) => {
        return params.id > 0 ? this.invoiceService.get(params.id) : of(new Invoice({
          customerId: 1,
          status: InvoiceStatus.New,
          date: moment().format()
        }));
      }))
      .subscribe(invoice => {
        this.invoice = Invoice.from(invoice);
        if (this.invoice.items.length > 0) {
          this.selectedIndex = 0;
        }
      });
  }

  ngAfterViewInit() {
    this.productLookup.focus();    
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  initColumns() {
    this.columns = [
      new GridColumn({
        caption: 'STT',
        field: 'index',
        width: '10%'
      }),
      new GridColumn({
        caption: 'Tên sản phẩm',
        field: 'product.name'
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'product.uom',
        width: '10%'
      }),
      new GridColumn({
        caption: 'SL',
        field: 'qty',
        width: '10%',
        isNumber: true
      }),
      new GridColumn({
        caption: 'Giá',
        field: 'price',
        width: '20%',
        isNumber: true,
        footer: function () {
          return this.invoice.status == InvoiceStatus.New ? `<div>Tổng</div>`
            : `<div>Tổng</div>
              <div>Thanh toán</div>
              <div class="balance">Còn lại</div>`
        }.bind(this)
      }),
      new GridColumn({
        caption: 'Thành tiền',
        field: 'total',
        width: '20%',
        isNumber: true,
        footer: function () {
          return this.invoice.status == InvoiceStatus.New ? `<div>${ this.utils.formatNumber(this.invoice.computedTotal)}</div>`
            : `<div>${this.utils.formatNumber(this.invoice.computedTotal)}</div>                  
                <div>${this.utils.formatNumber(Math.min(this.invoice.computedTotal, this.invoice.computedAmountPaid))}</div>
                <div class="balance">${this.utils.formatNumber(Math.max(this.invoice.computedTotal - this.invoice.computedAmountPaid, 0))}</div>`
        }.bind(this)
      })
    ];
  }

  handleHotkey(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.F2:
        this.new();
        break;
      case Key.F4:
        this.pay();
        break;
      case Key.F7:
        this.beginSearch();
        break;
      case Key.F9:
        if (this.canSave) {
          this.save();
        }
        
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
  }

  addItem(product: Product) {    
    if (!!product) {
      this.invoice.items.push(new InvoiceItem({
        id: Guid.create().toString(),
        invoiceId: this.invoice.id,
        productId: product.id,
        product: product,
        qty: 1,
        price: product.retailPrice,
        cost: product.cost,
        index: this.invoice.items.length + 1,
        isNew: true
      }));

      this.selectedIndex = this.invoice.items.length - 1;
    }
    else {
      this.lockHotkeys = true;
      this.grid.disableHotkeys();
      this.dialog.open(NoProductFoundDialog).afterClosed().subscribe(() => {
        this.grid.enableHotkeys();
        this.lockHotkeys = false;
      });              
    }
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

  onPaymentCommit(payment: Payment) {    
    this.flyout.hide();
    this.save(payment);    
  }

  new() {
    this.invoice = new Invoice({
      customerId: 1,
      status: InvoiceStatus.New,
      date: moment().format()
    });

    this.router.navigateByUrl('/retail');
    this.productLookup.focus();
  }

  onFlyoutShow() {
    this.grid.disableHotkeys();
    this.lockHotkeys = true;
  }

  onFlyoutHide() {
    this.flyoutView = '';
    this.productLookup.focus();
    this.productLookup.clear();
    this.grid.enableHotkeys();
    this.lockHotkeys = false;
  }

  addCustomer() {
    this.lockHotkeys = true;
    this.grid.disableHotkeys();
    this.dialog.open(AddCustomerDialog).afterClosed().subscribe(() => {
      this.grid.enableHotkeys();
      this.lockHotkeys = false;
    });
  }

  beginSearch() {
    let _this = this;
    $(this.el.nativeElement).find('.actions').fadeOut(100, function () {
      _this.searching = true;
      setTimeout(() => {
        $(_this.el.nativeElement).find('.toolbar-search .dropdown-container').fadeIn(100, function () {
          _this.searchInput.focus();
        });
      });          
    });    
  }

  endSearch() {
    this.searching = false;
    $(this.el.nativeElement).find('.actions').fadeIn(100);
  }

  onSearch(query) {
    this.isLoading = true;
    if (!!this._searchSubscription) {
      this._searchSubscription.unsubscribe();
    }

    this._searchSubscription = this.invoiceService.lookup(query).subscribe((invoices: Invoice[]) => {
      this.invoices = invoices;
      this.isLoading = false;
    });
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.keyCode == Key.Escape) {
      this.endSearch();
    }
  }

  onSearchSelect(invoiceId) {
    this.invoiceService.get(invoiceId).subscribe(invoice => {
      this.invoice = Invoice.from(invoice);
      this.selectedIndex = this.invoice.items.length > 0 ? 0 : -1;
    });
  }

  save(payment?: Payment) {
    let invoice = Object.assign(_.cloneDeep(this.invoice), {
      subTotal: this.invoice.computedSubTotal,
      total: this.invoice.computedTotal,
      totalCost: this.invoice.computedTotalCost,
      amountPaid: Math.min(!!payment ? payment.amount : (this.invoice.amountPaid || 0), this.invoice.computedTotal),
      status: !!payment ? InvoiceStatus.Paid : this.invoice.status,
      customerId: !!payment ? payment.customerId : this.invoice.customerId,
      payments: !!payment ? [payment] : undefined
    });

    for (let item of invoice.items) {
      if (item.isNew) {
        delete item.id;
      }
    }

    this.invoiceService.save(invoice).subscribe((result: Invoice) => {      
      this.notifier.notify('success', 'Lưu thành công');

      if (!invoice.id) {
        this.router.navigateByUrl(`/retail/${result.id}`);
      }
      else {
        this.invoice = Invoice.from(result);
      }
    });
  }

  view() {
    this.flyoutView = 'overview';
    this.flyout.show();
  }

  height() {
    return $(window).height() - $('.mat-toolbar').outerHeight(true) - $('.dropdown-container').outerHeight();
  }
}
