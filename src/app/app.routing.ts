import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  { path: 'product', loadChildren: './product/product.module#ProductModule'}  
];
