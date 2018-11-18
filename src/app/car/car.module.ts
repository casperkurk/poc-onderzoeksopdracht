import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarRoutingModule } from './car-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CarsTemplateComponent } from './components/cars-template/cars-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CarsTemplateComponent],
  imports: [
    CommonModule,
    CarRoutingModule,
    MatRadioModule,
    FormsModule,
    BrowserAnimationsModule
  ]
})
export class CarModule { }
