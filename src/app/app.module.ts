import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { WidgetModule } from './widgets/widget.module'

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {      
      preloadingStrategy: PreloadAllModules
    }),
    BrowserModule,
    BrowserAnimationsModule,
    WidgetModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
