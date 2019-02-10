import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from '../widgets/widget.module';
import { RouterModule } from '@angular/router';
import { routes } from './bulk-data.routing';
import { FormsModule } from '@angular/forms';
import { BulkDeleteComponent } from './components/bulk-delete/bulk-delete.component';
import { BulkDeleteProductComponent } from './components/bulk-delete/bulk-delete-product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule
  ],
  declarations: [BulkDeleteComponent, BulkDeleteProductComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BulkDataModule { }
