import { Component, OnInit } from '@angular/core';
import { GridColumn } from '../../../widgets/grid/grid.component';
import SaleOrder from '../../../models/saleOrder';
import SaleOrderItem from '../../../models/saleOrderItem';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor() { }

  columns: GridColumn[];
  order: SaleOrder = new SaleOrder();
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
  }

  addItem(item: SaleOrderItem) {    
    this.order.items.push(Object.assign(item, { index: this.order.items.length + 1 }));
  }
}
