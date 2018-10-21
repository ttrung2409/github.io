import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { FlyoutComponent } from './flyout/flyout.component'

@NgModule({  
  imports: [
    CommonModule
  ],
  declarations: [
    GridComponent,
    FlyoutComponent
  ],
  exports: [
    GridComponent,
    FlyoutComponent
  ]
})
export class WidgetModule { }
