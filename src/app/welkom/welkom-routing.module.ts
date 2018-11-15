import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelkomTemplateComponent } from './welkom-template/welkom-template.component';

const routes: Routes = [
  { path: 'welkom', component: WelkomTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class WelkomRoutingModule { }
