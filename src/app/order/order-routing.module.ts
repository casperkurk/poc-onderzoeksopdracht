import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTemplateComponent } from './order-template/order-template.component';

const routes: Routes = [
  { path: 'bestellen', component: OrderTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
