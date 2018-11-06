import { Component, OnInit, OnDestroy} from '@angular/core';
import { GridColumn } from '../../../widgets/grid/grid.component';
import SaleOrder from '../../../models/saleOrder';
import SaleOrderItem from '../../../models/saleOrderItem';
import Product from '../../../models/product';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']  
})
export class OrderComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  constructor() {
  }

  columns: GridColumn[];
  order: SaleOrder = new SaleOrder();  
  selectedIndex: number;

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
        case 38: // Up
          this.selectedIndex = Math.max(0, this.selectedIndex - 1);
          break;
        case 40: // Down
          this.selectedIndex = Math.min(this.order.items.length - 1, this.selectedIndex + 1);
          break;
      }

      switch (e.key) {
        case '+':
          this.order.items[this.selectedIndex].qty++;
          break;
        case '-':
          this.order.items[this.selectedIndex].qty = Math.max(0, this.order.items[this.selectedIndex].qty - 1);
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
        index: this.order.items.length + 1,
        productId: product.id,
        product: product,
        qty: 1,
        price: product.retailPrice        
      }));

      this.selectedIndex = this.order.items.length - 1;
    }    
  }

  onRowClick(item) {
    this.selectedIndex = this.order.items.indexOf(item);
  }
}
