import { Routes } from '@angular/router'
import { LoginComponent } from './login/login/login.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'product', loadChildren: './product/product.module#ProductModule' },
  { path: 'retail', loadChildren: './retail/retail.module#RetailModule' },
  { path: 'report', loadChildren: './report/report.module#ReportModule' },
  { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
  { path: 'bulk-data', loadChildren: './bulk-data/bulk-data.module#BulkDataModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }  
];
