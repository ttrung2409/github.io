import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { WidgetModule } from './widgets/widget.module'
import { NotifierModule } from 'angular-notifier';
import ProductService from './services/product.service';
import InvoiceService from './services/invoice.service';
import CustomerService from './services/customer.service';
import UtilsService from './services/utils.service';
import ReportService from './services/report.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './app.config';
import { APP_GLOBAL, AppGlobal } from './app.global'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    WidgetModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right'          
        },
        vertical: {
          position: 'bottom',          
        },        
      },
      behaviour: {
        autoHide: 2000,
      }
    })
  ],
  providers: [
    ProductService,
    InvoiceService,
    CustomerService,
    UtilsService,
    ReportService,
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: APP_GLOBAL, useValue: AppGlobal }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
