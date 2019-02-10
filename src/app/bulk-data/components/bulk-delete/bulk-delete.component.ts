import { Component, OnInit, ViewChild } from '@angular/core';
import v8n from 'v8n'
import BulkDataService from 'src/app/services/bulk-data.service';
import { BulkDeleteProductComponent } from './bulk-delete-product.component';
import { FlyoutComponent } from 'src/app/widgets/flyout/flyout.component';
import UtilsService from 'src/app/services/utils.service';

@Component({
  selector: 'bulk-delete',
  templateUrl: './bulk-delete.component.html',
  styleUrls: ['./bulk-delete.component.scss']
})
export class BulkDeleteComponent implements OnInit {

  constructor(private bulkDataService: BulkDataService, private utils: UtilsService) { }

  @ViewChild(BulkDeleteProductComponent) bulkDeleteProduct;
  @ViewChild(FlyoutComponent) flyout;
  
  viewBy: string = 'product';
  fromDate: string;
  toDate: string;
  amountSearch: any = { by: 'no', from: null, to: null };  

  ngOnInit() {
  }

  search() {
    this.flyout.hide();
    switch (this.viewBy) {
      case 'product':
        this.bulkDeleteProduct.search({
          fromDate: !!this.fromDate ? this.utils.toDbDate(this.fromDate) : null,
          toDate: !!this.toDate ? this.utils.toDbDate(this.toDate) : null,
          fromAmount: this.amountSearch.by == 'no' ? 0 : (this.amountSearch.from || null),
          toAmount: this.amountSearch.by == 'no' ? 0 : (this.amountSearch.to || null)
        });

        break;
      case 'customer':
        //this.bulkDeleteCustomer.search();
        break;
    }
  }
}
