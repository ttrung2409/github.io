import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { routes } from './product.routing'
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component'
import ProductService from '../services/productService';
import { WidgetModule } from '../widgets/widget.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [ProductComponent, ProductListComponent],
  providers: [ProductService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductModule { }
