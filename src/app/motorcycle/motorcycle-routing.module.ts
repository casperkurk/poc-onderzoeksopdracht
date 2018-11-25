import { NgModule } from '@angular/core';
import { MotorcyclesTemplateComponent } from './components/motorcycles-template/motorcycles-template.component';
import { Routes, RouterModule } from '@angular/router';
import { DefectiveServiceGuard } from '../common/guards/defective-service.guard';

const routes: Routes = [{
  path: 'motoren',
  component: MotorcyclesTemplateComponent,
  canActivate: [DefectiveServiceGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MotorcycleRoutingModule { }
