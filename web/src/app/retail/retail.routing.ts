import { Routes } from '@angular/router'
import { RetailComponent } from './components/retail/retail.component';

export const routes: Routes = [
  { path: '', component: RetailComponent },
  { path: ':id', component: RetailComponent }
];
