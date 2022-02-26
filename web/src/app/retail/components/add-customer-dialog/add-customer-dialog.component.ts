import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import CustomerService from '../../../services/customer.service';
import Customer from '../../../models/customer';
import { Key } from 'ts-keycode-enum';
import v8n from 'v8n'

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialog implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService) { }

  customer: Customer = new Customer();
  errors: Map<string, string> = new Map();

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.F9:
        this.save();
        break;
    }
  };

  ngOnInit() {
  }

  save() {
    if (this.validate()) {
      this.customerService.save(Object.assign(this.customer, { typeId: 1 })).subscribe();
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  validate(): boolean {
    this.errors.clear();
    if (v8n().empty().test(this.customer.name || '')) {
      this.errors.set('name', 'Vui lòng nhập tên khách hàng');
    }

    return this.errors.size == 0;
  }
}
