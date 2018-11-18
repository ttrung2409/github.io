import { Routes } from '@angular/router'

export const appRoutes: Routes = [  
  { path: 'product', loadChildren: './product/product.module#ProductModule' },
  { path: 'retail', loadChildren: './retail/retail.module#RetailModule' }  
];
