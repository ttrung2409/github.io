import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { routes } from './sale-order.routing'
import { RouterModule } from '@angular/router';
import { WidgetModule } from '../widgets/widget.module';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule
  ],
  declarations: [
    OrderComponent    
  ],
  providers: [DecimalPipe],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SaleOrderModule { }
