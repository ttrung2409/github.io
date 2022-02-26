import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './user.routing'
import { WidgetModule } from '../widgets/widget.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule
  ],
  declarations: [UserListComponent, UserComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
