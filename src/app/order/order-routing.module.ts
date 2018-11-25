import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTemplateComponent } from './components/order-template/order-template.component';
import { DefectiveServiceGuard } from '../common/guards/defective-service.guard';

const routes: Routes = [
  { path: 'bestellen', component: OrderTemplateComponent, canActivate: [DefectiveServiceGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
