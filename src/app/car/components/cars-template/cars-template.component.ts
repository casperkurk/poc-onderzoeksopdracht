import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { HttpResponse } from '@angular/common/http';
import { DefectApiServiceService } from '../../../common/services/defect-api-service.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-cars-template',
  templateUrl: './cars-template.component.html',
  styleUrls: ['./cars-template.component.css']
})
export class CarsTemplateComponent implements OnInit {
  cars: any;
  errorMessage: string;
  shouldDetectDefectServiceFromInterceptor: boolean;

  constructor(private carService: CarService, private defectApiServiceService: DefectApiServiceService) { }

  ngOnInit() {
    this.defectApiServiceService.defectServices$.subscribe(defectServiceNames => {
      if (!this.shouldDetectDefectServiceFromInterceptor) return;
      if (defectServiceNames.find(defectService => defectService === CarService.serviceName))
        this.errorMessage = 'Uitgevallen service passief gedecteerd door een interceptor. ' +
        'Deze boodschap is gecommuniceert via een gedeelde Angular-service';
      else
        this.errorMessage = null;
    });

    this.refreshCarsData();
  }

  getCarImageSrc(car: any) {
    return `assets/${car.pictureId}.jpg`;
  }

  errorDetectionChanged(event: MatRadioChange) {
    if (event.value === 1) this.shouldDetectDefectServiceFromInterceptor = false;
    else this.shouldDetectDefectServiceFromInterceptor = true;

    this.refreshCarsData();
  }

  private refreshCarsData() {
    this.carService.getCars().subscribe(response => {
      this.errorMessage = null;
      this.cars = response.body;
    }, (error: HttpResponse<any>) => {
      if (!this.shouldDetectDefectServiceFromInterceptor && error.status === 0) {
        this.errorMessage = 'Uitgevallen service passief gedecteerd door de HttpClient.';
        this.defectApiServiceService.defectServiceDetected(CarService.baseUrl);
      }
    });
  }

}
