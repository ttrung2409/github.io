import { Component, OnInit } from '@angular/core';
import v8n from 'v8n'
import BulkDataService from 'src/app/services/bulk-data.service';

@Component({
  selector: 'bulk-delete',
  templateUrl: './bulk-delete.component.html',
  styleUrls: ['./bulk-delete.component.scss']
})
export class BulkDeleteComponent implements OnInit {

  constructor(private bulkDataService: BulkDataService) { }

  viewBy: string = 'product';
  search: any = { by: 'no' };
  errors: Map<string, string> = new Map();

  ngOnInit() {
  }

  doSearch() {
    if (!this.validate()) return;

    switch (this.viewBy) {
      case 'product':
        this.bulkDeleteProduct.search();
        break;
      case 'customer':
        this.bulkDeleteCustomer.search();
        break;
    }
  }

  validate() {
    this.errors.clear();
    if (v8n().empty().test(this.search.from || '')) {
      this.errors.set('income.from', 'Vui lòng nhập giá trị');
    }

    if (v8n().empty().set(this.search.to || '')) {
      this.errors.set('income.to', 'Vui lòng nhập giá trị');
    }

    return this.errors.size == 0;
  }
}
