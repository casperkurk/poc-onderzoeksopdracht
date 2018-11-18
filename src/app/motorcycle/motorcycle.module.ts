import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcycleRoutingModule } from './motorcycle-routing.module';
import { MotorcyclesTemplateComponent } from './components/motorcycles-template/motorcycles-template.component';
import { MotorcycleService } from './services/motorcycle.service';

@NgModule({
  declarations: [MotorcyclesTemplateComponent],
  imports: [
    CommonModule,
    MotorcycleRoutingModule
  ],
  providers: [MotorcycleService]
})
export class MotorcycleModule { }
