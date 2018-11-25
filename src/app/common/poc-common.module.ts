import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefectApiServiceService } from './services/defect-api-service.service';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    NavbarTopComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule
  ],
  providers: [
    DefectApiServiceService
  ],
  exports: [
    NavbarTopComponent
  ]
})
export class PocCommonModule { }
