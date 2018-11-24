import { Routes } from '@angular/router'
import { IncomeComponent } from './components/income/income.component';

export const routes: Routes = [
  {
    path: '',
    component: IncomeComponent
  },
  {
    path: 'income',
    component: IncomeComponent
  }
];
