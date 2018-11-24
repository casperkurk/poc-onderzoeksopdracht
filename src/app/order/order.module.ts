import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTemplateComponent } from './components/order-template/order-template.component';
import { OrderRoutingModule } from './order-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [OrderTemplateComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class OrderModule { }
