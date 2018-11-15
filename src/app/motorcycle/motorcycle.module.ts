import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcycleRoutingModule } from './motorcycle-routing.module';
import { MotorcyclesTemplateComponent } from './motorcycles-template/motorcycles-template.component';

@NgModule({
  declarations: [MotorcyclesTemplateComponent],
  imports: [
    CommonModule,
    MotorcycleRoutingModule
  ]
})
export class MotorcycleModule { }
