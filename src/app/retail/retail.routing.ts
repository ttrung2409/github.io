import { Routes } from '@angular/router'
import { RetailComponent } from './components/retail/retail.component';

export const routes: Routes = [
  { path: 'retail', redirectTo: 'retail/' },
  { path: 'retail/:id', component: RetailComponent }
];
