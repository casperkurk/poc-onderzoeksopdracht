import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelkomRoutingModule } from './welkom-routing.module';
import { WelkomTemplateComponent } from './welkom-template/welkom-template.component';

@NgModule({
  declarations: [WelkomTemplateComponent],
  imports: [
    CommonModule,
    WelkomRoutingModule
  ]
})
export class WelkomModule { }
