import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { routes } from './product.routing'
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component'
import { WidgetModule } from '../widgets/widget.module';
import { FormsModule } from '@angular/forms';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ConfirmDialogComponent } from '../widgets/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule    
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductSearchComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [ConfirmDialogComponent]
})
export class ProductModule { }
