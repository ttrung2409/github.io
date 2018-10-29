import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { FlyoutComponent } from './flyout/flyout.component';
import { DropdownComponent } from './dropdown/dropdown.component'
import { FormsModule } from '@angular/forms';
import { BindableComponent } from './bindable.component';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({  
  imports: [
    CommonModule,
    FormsModule,    
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatRippleModule,
    MatCheckboxModule
  ],
  declarations: [
    GridComponent,
    FlyoutComponent,
    DropdownComponent,
    BindableComponent
  ],
  exports: [
    GridComponent,
    FlyoutComponent,
    DropdownComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatRippleModule,
    MatCheckboxModule
  ]
})
export class WidgetModule { }
