import { NgModule } from '@angular/core';
import { MotorcyclesTemplateComponent } from './motorcycles-template/motorcycles-template.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'motoren', component: MotorcyclesTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MotorcycleRoutingModule { }
