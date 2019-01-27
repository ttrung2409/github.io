import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerSearchComponent } from './components/customer-search/customer-search.component';
import { FormsModule } from '@angular/forms';
import { WidgetModule } from '../widgets/widget.module';
import { RouterModule } from '@angular/router';
import { routes } from './customer.routing'
import { ConfirmDialogComponent } from '../widgets/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerComponent,
    CustomerSearchComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [ConfirmDialogComponent]
})
export class CustomerModule { }
