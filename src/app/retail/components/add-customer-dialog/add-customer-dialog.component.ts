import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import CustomerService from '../../../services/customer.service';
import Customer from '../../../models/customer';
import { Key } from 'ts-keycode-enum';

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

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.F4:
        this.save();
        break;
    }
  };

  ngOnInit() {  
  }

  save() {
    this.customerService.save(this.customer);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
