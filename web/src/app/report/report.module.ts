import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './components/income/income.component';
import { RouterModule } from '@angular/router';
import { routes } from './report.routing';
import { WidgetModule } from '../widgets/widget.module';
import { FormsModule } from '@angular/forms';
import { IncomeByInvoiceComponent } from './components/income/income-by-invoice.component';
import { IncomeByCustomerComponent } from './components/income/income-by-customer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule    
  ],
  declarations: [
    IncomeComponent,
    IncomeByInvoiceComponent,
    IncomeByCustomerComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReportModule { }
