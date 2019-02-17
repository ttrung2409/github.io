import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'product', loadChildren: './product/product.module#ProductModule' },
  { path: 'retail', loadChildren: './retail/retail.module#RetailModule' },
  { path: 'report', loadChildren: './report/report.module#ReportModule' },
  { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
  { path: 'bulk-data', loadChildren: './bulk-data/bulk-data.module#BulkDataModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }  
];
