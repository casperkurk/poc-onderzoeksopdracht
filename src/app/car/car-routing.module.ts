import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsTemplateComponent } from './components/cars-template/cars-template.component';


const routes: Routes = [
  { path: 'autos', component: CarsTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
