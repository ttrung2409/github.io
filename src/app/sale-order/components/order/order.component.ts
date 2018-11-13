import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, ElementRef, ChangeDetectorRef} from '@angular/core';
import { GridColumn, GridComponent } from '../../../widgets/grid/grid.component';
import SaleOrder from '../../../models/saleOrder';
import SaleOrderItem from '../../../models/saleOrderItem';
import Product from '../../../models/product';
import { Subscription, fromEvent } from 'rxjs';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import { Key } from 'ts-keycode-enum'
import { Guid } from 'guid-typescript'
import { ProductLookupComponent } from '../../../widgets/product-lookup/product-lookup.component';
declare var _: any;
declare var $: any;

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  @ViewChild('qtyEditor') qtyEditor: FlyoutComponent;
  @ViewChild('productLookup') productLookup: ProductLookupComponent;  
  @ViewChild('qtyInput') qtyInput: ElementRef;
  @ViewChild('grid') grid: GridComponent;

  columns: GridColumn[];
  order: SaleOrder = new SaleOrder();  
  selectedProductId: number;
  selectedIndex: number;
  selectedItem: SaleOrderItem = new SaleOrderItem();

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
        width: '180px'
      }),
      new GridColumn({
        caption: 'Thành tiền',
        field: 'total',
        width: '200px'
      })
    ];

    this._subscription = fromEvent(document, 'keyup').subscribe((e: KeyboardEvent) => {
      switch (e.keyCode) {
        case Key.Escape:
          this.cancel();
          break;
        case Key.F4:
          this.ok();
          break;
      }

      switch (e.key) {
        case '+':
          this.order.items[this.selectedIndex].qty++;
          break;
        case '-':
          this.order.items[this.selectedIndex].qty = Math.max(0, this.order.items[this.selectedIndex].qty - 1);
          break;
        case 'l':
          if (!!this.selectedItem) {
            this.selectedItem.price = this.selectedItem.product.retailPrice;
          }

          break;
        case 's':          
          if (!!this.selectedItem) {
            this.selectedItem.price = this.selectedItem.product.wholeSalePrice;
          }

          break;
        case 'k':
          if (!!this.selectedItem) {
            this.selectedItem.price = this.selectedItem.product.discountPrice;
          }

          break;
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  addItem(product: Product) {
    if (!!product) {
      this.order.items.push(new SaleOrderItem({        
        id: Guid.create().toString(),
        productId: product.id,
        product: product,
        qty: 1,
        price: product.retailPrice,
        index: this.order.items.length + 1
      }));

      this.selectedIndex = this.order.items.length - 1;
    }    
  }

  onKeydown(event: KeyboardEvent) {    
    this.grid.handleKeyEvent(event);
  }

  onSelect(item: SaleOrderItem) {    
    this.selectedItem = _.cloneDeep(item);
    this.qtyEditor.show().then(() => {
      $(this.qtyInput.nativeElement).focus();            
    });
  }

  onDelete(item: SaleOrderItem) {
    this.order.items = this.order.items.filter(x => x.id != item.id);
    let index = 1;
    for (let item of this.order.items) {
      item.index = index++;
    }

    this.selectedIndex = Math.min(this.order.items.length - 1, this.selectedIndex);    
  }

  cancel() {
    this.productLookup.focus();
    this.productLookup.clear();
    this.qtyEditor.hide();        
  }

  ok() {
    this.productLookup.focus();
    this.productLookup.clear();
    this.qtyEditor.hide();
    this.order.items[this.selectedIndex] = this.selectedItem;    
  }
}
