import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, ElementRef, ChangeDetectorRef, AfterViewInit, IterableDiffer, KeyValueDiffer, KeyValueDiffers, IterableDiffers, DoCheck} from '@angular/core';
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
import { MatDialog, MatButton } from '@angular/material';
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
import { ConfirmDialogComponent } from 'src/app/widgets/confirm-dialog/confirm-dialog.component';
import DialogResult from 'src/app/valueObjects/DialogResult';
import { PrintComponent } from '../print/print.component';
import Customer from 'src/app/models/customer';
import v8n from 'v8n'
import { ProductLookupDialogComponent } from '../product-lookup-dialog/product-lookup-dialog.component';
import { CustomerLookupComponent } from 'src/app/widgets/customer-lookup/customer-lookup.component';

@Component({
  selector: 'retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RetailComponent implements OnInit, OnDestroy, AfterViewInit, DoCheck {
  private _subscription: Subscription = new Subscription();
  private _searchSubscription: Subscription = new Subscription();
  private _itemsDiffer: IterableDiffer<any>;
  private _invoiceDiffer: KeyValueDiffer<string, any>;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private utils: UtilsService,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private invoiceDifferFactory: KeyValueDiffers,
    private itemsDifferFactory: IterableDiffers) {    
  }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild('productLookup') productLookup: ProductLookupComponent;
  @ViewChild('qtyEditor') qtyEditor: QtyEditorComponent;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('paymentView') paymentView: PaymentComponent;
  @ViewChild('searchInput') searchInput: TypeaheadComponent;
  @ViewChild(PrintComponent) printComponent;
  @ViewChild(CustomerLookupComponent) customerLookup; 

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
  dirty: boolean;
  selectedPrice: string = 'retail';  

  get canView() {
    return this.invoice.id > 0;
  }

  get canSave() {
    return this.invoice.items.length > 0 && this.invoice.status != InvoiceStatus.Cancelled && this.dirty;
  }

  get canPrint() {
    return this.invoice.id > 0 && this.invoice.status != InvoiceStatus.Cancelled;
  }

  get canPay() {
    return this.invoice.items.length > 0 && this.invoice.status != InvoiceStatus.Cancelled;
  }

  get canCancel() {
    return this.invoice.id > 0 && this.invoice.status != InvoiceStatus.Cancelled;
  }

  get customerName() {
    return !!this.invoice.customer && !!this.invoice.customer.name ? this.invoice.customer.name : 'Khách lẻ';
  }

  ngDoCheck() {
    if (this.invoice.status == InvoiceStatus.Cancelled) return;

    if (!!this._invoiceDiffer) {
      let changes = this._invoiceDiffer.diff(this.invoice);
      if (!!changes) {
        changes.forEachChangedItem(x => {
          if (x.currentValue != x.previousValue && typeof (x.currentValue) !== 'object') {
            this.dirty = true;
          }
        });
      }      
    }
    
    if (!!this._itemsDiffer) {
      let itemChanges = this._itemsDiffer.diff(this.invoice.items);
      if (!!itemChanges) {
        this.dirty = true;
      }
    }        
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
        this.reset();
        if (this.invoice.items.length > 0) {
          this.selectedIndex = 0;
        }
      });
  }

  ngAfterViewInit() {
    this.new();
  }

  ngOnDestroy() {
    this._searchSubscription.unsubscribe();
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
        field: 'product.name',
        format: function (value, item) {
          let html = `<div class='item-desc'><p>${value}</p>`;
          if (!!item.product.spec) {
            html += `<p class='spec'>1 ${item.product.spec.uom.name}: ${this.utils.formatNumber(item.product.spec.qty)}
                    ${!!item.product.uom ? item.product.uom.name : ''}</p>`;            
          }

          if (!!item.notes) {
            html += `<p class='notes'>${item.notes}</p>`
          }

          return html + '</div>';
        }.bind(this)
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'product.uom.name',
        width: '10%'
      }),
      new GridColumn({
        caption: 'SL',
        field: 'qty',
        width: '10%',
        isNumber: true,
        allowDecimal: true
      }),
      new GridColumn({
        caption: 'Giá',
        field: 'price',
        width: '20%',
        isNumber: true,
        footer: 'Tổng'
      }),
      new GridColumn({
        caption: 'Thành tiền',
        field: 'total',
        width: '20%',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.invoice.computedTotal);
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
        if (this.canPay) {
          this.pay();
        }

        break;
      case Key.F7:
        this.beginSearch();
        break;
      case Key.F9:
        if (this.canSave) {
          this.save();
        }

        break;
      case Key.L:
        if (e.shiftKey) {
          this.onPriceTagClick('retail');
          e.preventDefault();
        }

        break;
      case Key.S:
        if (e.shiftKey) {
          this.onPriceTagClick('wholesale');
          e.preventDefault();
        }

        break;
      case Key.K:
        if (e.shiftKey) {
          this.onPriceTagClick('discount');
          e.preventDefault();
        }

        break;
    }

    switch (e.key) {
      case '+':
        this.invoice.items[this.selectedIndex].qty++;
        this.invoice.items[this.selectedIndex] = Object.assign(InvoiceItem.from(this.invoice.items[this.selectedIndex]), { class: '' });

        break;
      case '-':
        this.invoice.items[this.selectedIndex].qty = Math.max(1, this.invoice.items[this.selectedIndex].qty - 1);
        this.invoice.items[this.selectedIndex] = Object.assign(InvoiceItem.from(this.invoice.items[this.selectedIndex]), { class: 'pink' });
        break;
    }
  }

  addItem(product: Product) {
    if (!!product && product.id > 0) {
      let index = this.invoice.items.findIndex(x => x.productId == product.id);
      if (index > -1) {
        this.invoice.items[index].qty++;
        this.invoice.items[index] = InvoiceItem.from(this.invoice.items[index]);
        this.selectedIndex = index;
        this.grid.scrollTo(Math.max(0, (index - 1) * 60));
      }
      else {
        this.invoice.items.push(new InvoiceItem({
          id: Guid.create().toString(),
          invoiceId: this.invoice.id,
          productId: product.id,
          product: product,
          qty: 1,
          price: this.selectedPrice == 'retail' ? product.retailPrice
            : this.selectedPrice == 'wholesale' ? product.wholesalePrice
              : this.selectedPrice == 'discount' ? product.discountPrice : product.retailPrice,
          cost: product.cost,         
          index: this.invoice.items.length + 1,
          isNew: true,
          notes: product.notes
        }));

        this.selectedIndex = this.invoice.items.length - 1;
        setTimeout(() => this.grid.scrollTo(Math.max(0, (this.selectedIndex - 1) * 60)));
      }
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
    let payment = this.invoice.payments.length > 0 ? this.invoice.payments[0] : new Payment({
      invoiceId: this.invoice.id,
      customerId: this.invoice.customerId,
      method: PaymentMethod.Cash,      
    });
    
    payment.amount = this.invoice.computedTotal;
    this.save(payment).then(ok => {
      if (ok) {
        setTimeout(() => this.printComponent.print());
        setTimeout(() => this.new());
      }      
    });
  }

  onItemChange(item) {
    this.flyout.hide();
    this.invoice.items = this.invoice.items.map(x => x.id == item.id ? Object.assign(item, { class: '' }) : x);
  }

  onPaymentCommit(payment: Payment) {
    this.flyout.hide();
    this.save(payment);
  }

  onPriceTagClick(selectedPrice: string) {    
    this.selectedPrice = selectedPrice;
    this.productLookup.focus();
    this.productLookup.clear();
  }

  new() {
    if (this.dirty) {
      this.grid.disableHotkeys();
      this.dialog.open(ConfirmDialogComponent,
        { data: { msg: 'Bạn vừa thay đổi đơn hàng. Bạn có chắc chắn hủy thay đổi?' } })
        .afterClosed()
        .subscribe(result => {
          this.grid.enableHotkeys();
          this.productLookup.focus();
          if (result == DialogResult.OK) {
            doNew.call(this);
          }
        });
    }
    else {
      doNew.call(this);
    }

    function doNew() {
      if (!!this.invoice && this.invoice.customerId > 1) {
        this.customerLookup.clear();
      }

      this.invoice = new Invoice({
        customerId: 1,
        status: InvoiceStatus.Draft,
        date: moment().format()
      });

      this.router.navigateByUrl('/retail');      
      this.selectedPrice = 'retail';
      this.reset();      
    }    
  }

  reset() {    
    this._invoiceDiffer = this.invoiceDifferFactory.find(this.invoice).create();
    this._itemsDiffer = this.itemsDifferFactory.find(this.invoice.items).create();
    setTimeout(() => this.dirty = false);
    this.productLookup.focus();
    this.productLookup.clear();
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
      this.productLookup.focus();
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
    setTimeout(() => {
      this.invoices = [];
      this.searching = false;
      $(this.el.nativeElement).find('.actions').fadeIn(100);
      this.productLookup.focus();
    }, 300);
  }

  onSearch(query) {
    this.isLoading = true;
    if (!!this._searchSubscription) {
      this._searchSubscription.unsubscribe();
    }

    this._searchSubscription = this.invoiceService.lookup(query).subscribe((invoices: Invoice[]) => {
      this.invoices = invoices;
      this.isLoading = false;
      if (query.startsWith('$')) {
        this.searchInput.show();
      }
    });
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.keyCode == Key.Escape) {
      this.endSearch();
    }
  }

  load(invoiceId) {
    if (invoiceId > 0) {
      this.endSearch();
      if (this.dirty) {
        this.grid.disableHotkeys();
        this.dialog.open(ConfirmDialogComponent,
          { data: { msg: 'Bạn vừa thay đổi đơn hàng. Bạn có chắc chắn hủy thay đổi và tiếp tục?' } })
          .afterClosed()
          .subscribe(result => {
            this.grid.enableHotkeys();
            this.productLookup.focus();
            if (result == DialogResult.OK) {
              load.call(this);
            }
          });
      }
      else {
        load.call(this);
      }
    }
    
    function load() {      
      this.invoiceService.get(invoiceId).subscribe(invoice => {
        this.invoice = Invoice.from(invoice);
        this.selectedIndex = this.invoice.items.length > 0 ? 0 : -1;
        this.reset();
      });
    }    
  }

  save(payment?: Payment) {
    if (!this.validate()) return Promise.resolve(false);

    let invoice = Object.assign(_.cloneDeep(this.invoice), {
      subTotal: this.invoice.computedSubTotal,
      total: this.invoice.computedTotal,
      totalCost: this.invoice.computedTotalCost,
      amountPaid: !!payment ? Math.min(payment.amount, this.invoice.computedTotal)
        : this.invoice.status == InvoiceStatus.Paid ? this.invoice.computedTotal : (this.invoice.amountPaid || 0),      
      payments: !!payment ? [payment] : undefined
    });

    invoice.status = !!payment ? InvoiceStatus.Paid
      : invoice.status == InvoiceStatus.Draft ? InvoiceStatus.New : invoice.status;
        
    for (let item of invoice.items) {
      if (item.isNew) {
        delete item.id;
      }
    }

    return new Promise(resolve => {
      this.invoiceService.save(invoice).subscribe((result: Invoice) => {
        this.notifier.notify('success', 'Lưu thành công');
        this.invoice = Invoice.from(result);
        this.reset();
        resolve(true);
      });
    });    
  }

  validate() {
    if (v8n().empty().test(this.invoice.customerId || '')) {
      this.notifier.notify('error', 'Vui lòng nhập khách hàng');
      return false;
    }

    return true;
  } 

  height() {
    return $(window).height() - $('.mat-toolbar').outerHeight(true) - $('.dropdown-container').outerHeight();
  }

  cancel() {
    this.grid.disableHotkeys();
    this.dialog.open(ConfirmDialogComponent,
      { data: { msg: 'Bạn có chắc chắn hủy đơn hàng này?' } })
      .afterClosed()
      .subscribe(result => {
        this.grid.enableHotkeys();
        this.productLookup.focus();
        if (result == DialogResult.OK) {
          this.invoiceService.cancel(this.invoice.id).subscribe(invoice => {
            this.notifier.notify('success', 'Đơn hàng đã hủy');
            this.invoice = Invoice.from(invoice);
            this.reset();
          });
        }        
      });
  }

  print() {    
    this.printComponent.print(); 
  }

  onCustomerSelect(customer: Customer) {    
    this.invoice.customer = customer;
  }

  lookupProduct() {
    this.lockHotkeys = true;
    this.grid.disableHotkeys();
    this.dialog.open(ProductLookupDialogComponent, { disableClose: true }).afterClosed().subscribe(() => {
      this.grid.enableHotkeys();
      this.productLookup.focus();
      this.lockHotkeys = false;
    });
  }
}
