import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefectApiServiceService } from './services/defect-api-service.service';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarTopComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    DefectApiServiceService
  ],
  exports: [
    NavbarTopComponent
  ]
})
export class PocCommonModule { }
