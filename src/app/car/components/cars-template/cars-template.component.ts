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
  shouldDetectDefectServiceFromInterceptor: boolean;
  carServiceIsDefective: boolean;
  errorMessage: string;
  isLoadingCarData: boolean;

  constructor(private carService: CarService, private defectApiServiceService: DefectApiServiceService) { }

  ngOnInit() {
    this.defectApiServiceService.defectServices$.subscribe(defectServiceNames => {
      if (!this.shouldDetectDefectServiceFromInterceptor) return;
      if (defectServiceNames.find(defectService => defectService === CarService.serviceName)) {
        this.errorMessage = 'De defecte service is gedetecteerd door de Interceptor';
        this.carServiceIsDefective = true;
      }
    });

    this.refreshCarsData();
  }

  getCarImageSrc(car: any) {
    return `assets/${car.pictureId}.jpg`;
  }

  errorDetectionChanged(event: MatRadioChange) {
    if (event.value === '1') this.shouldDetectDefectServiceFromInterceptor = false;
    else this.shouldDetectDefectServiceFromInterceptor = true;

    this.refreshCarsData();
  }

  private refreshCarsData() {
    this.isLoadingCarData = true;
    this.carService.getCars().subscribe(response => {
      this.isLoadingCarData = false;
      this.carServiceIsDefective = false;
      this.cars = response.body;
    }, (error: HttpResponse<any>) => {
      this.isLoadingCarData = false;

      if (!this.shouldDetectDefectServiceFromInterceptor && (error.status === 0 || error.status === 504)) {
        this.errorMessage = 'De defecte service is gedetecteerd door de HttpClient';
        this.carServiceIsDefective = true;
        this.defectApiServiceService.defectServiceDetected(CarService.baseUrl);
      }
    });
  }
}
