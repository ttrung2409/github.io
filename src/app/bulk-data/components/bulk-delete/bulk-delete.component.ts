import { Component, OnInit, ViewChild } from '@angular/core';
import v8n from 'v8n'
import BulkDataService from 'src/app/services/bulk-data.service';
import { BulkDeleteProductComponent } from './bulk-delete-product.component';
import { FlyoutComponent } from 'src/app/widgets/flyout/flyout.component';
import UtilsService from 'src/app/services/utils.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/widgets/confirm-dialog/confirm-dialog.component';
import DialogResult from 'src/app/valueObjects/DialogResult';
import Product from 'src/app/models/product';
import * as _ from 'lodash'
import Customer from 'src/app/models/customer';
import { NotifierService } from 'angular-notifier';
import ScreenLocker from 'src/app/services/screen-locker';

@Component({
  selector: 'bulk-delete',
  templateUrl: './bulk-delete.component.html',
  styleUrls: ['./bulk-delete.component.scss']
})
export class BulkDeleteComponent implements OnInit {

  constructor(private bulkDataService: BulkDataService,
    private utils: UtilsService,
    private dialog: MatDialog,
    private notifier: NotifierService,
    private screenLocker: ScreenLocker) { }

  @ViewChild(FlyoutComponent) flyout;
  
  viewBy: string = 'product';
  fromDate: string;
  toDate: string;
  amountSearch: any = { by: 'no', from: null, to: null };
  products: Product[] = [];
  customers: Customer[] = [];
  showProgress: boolean = false;

  get params() {
    return {
      fromDate: !!this.fromDate ? this.utils.toDbDate(this.fromDate) : null,
      toDate: !!this.toDate ? this.utils.toDbDate(this.toDate) : null,
      fromAmount: this.amountSearch.by == 'no' ? 0 : (this.amountSearch.from || null),
      toAmount: this.amountSearch.by == 'no' ? 0 : (this.amountSearch.to || null)
    }
  }

  get canDelete() {
    return (this.viewBy == 'product' && this.products.length > 0) || (this.viewBy == 'customer' && this.customers.length > 0);
  }

  ngOnInit() {
  }

  search() {
    this.flyout.hide();
    this.showProgress = true;
    switch (this.viewBy) {
      case 'product':
        this.bulkDataService.findProductsWithIncomeBetween(this.params).subscribe(products => {          
          this.products = products;
          this.showProgress = false;
        });

        break;
      case 'customer':
        this.bulkDataService.findCustomersWithIncomeBetween(this.params).subscribe(customers => {
          this.customers = customers;
          this.showProgress = false;
        });

        break;
    }
  }

  delete() {
    this.dialog.open(ConfirmDialogComponent,
      { data: { msg: 'Bạn có chắc chắn xóa?' } })
      .afterClosed()
      .subscribe(result => {
        if (result == DialogResult.OK) {          
          switch (this.viewBy) {
            case 'product':
              let selectedProducts = this.products.filter(x => x.selected);
              if (selectedProducts.length > 0) {
                this.bulkDataService.deleteProducts(selectedProducts.map(x => x.id).join(',')).subscribe(() => {
                  this.notifier.notify('success', 'Xóa thành công');                  
                  this.products = this.products.filter(x => !x.selected);
                });
              }
              

              break;
            case 'customer':
              let selectedCustomers = this.customers.filter(x => x.selected);
              if (selectedCustomers.length > 0) {
                this.bulkDataService.deleteCustomers(selectedCustomers.map(x => x.id).join(',')).subscribe(() => {
                  this.notifier.notify('success', 'Xóa thành công');                  
                  this.customers = this.customers.filter(x => !x.selected);
                });
              }

              break;           
          }
        }
      });    
  }
}
