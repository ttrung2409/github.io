import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SuiModule } from 'ng2-semantic-ui';
import { appRoutes } from './app.routing'
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
    SuiModule,
    WidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
