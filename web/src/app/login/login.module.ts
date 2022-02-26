import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './login.routing'
import { WidgetModule } from '../widgets/widget.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
  ],
  declarations: [LoginComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
