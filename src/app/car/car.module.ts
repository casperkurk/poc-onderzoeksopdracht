import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarRoutingModule } from './car-routing.module';
import { CarsTemplateComponent } from './cars-template/cars-template.component';

@NgModule({
  declarations: [CarsTemplateComponent],
  imports: [
    CommonModule,
    CarRoutingModule
  ]
})
export class CarModule { }
