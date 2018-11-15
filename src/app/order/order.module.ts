import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTemplateComponent } from './order-template/order-template.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [OrderTemplateComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
