import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './components/income/income.component';
import { RouterModule } from '@angular/router';
import { routes } from './report.routing';
import { WidgetModule } from '../widgets/widget.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule    
  ],
  declarations: [IncomeComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReportModule { }
