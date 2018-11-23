import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarModule } from './car/car.module';
import { MotorcycleModule } from './motorcycle/motorcycle.module';
import { OrderModule } from './order/order.module';
import { APIInterceptor } from './common/interceptors/api-interceptor';
import { ErrorInterceptor } from './common/interceptors/error-interceptor';
import { PocCommonModule } from './common/poc-common.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CarModule,
    MotorcycleModule,
    OrderModule,
    PocCommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
