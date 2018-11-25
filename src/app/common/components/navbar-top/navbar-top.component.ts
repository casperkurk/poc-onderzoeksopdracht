import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefectServicesQuery } from '../../../akita/defect-services.query';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Service } from '../../../akita/defect-services.model';
import { DefectApiServiceService } from '../../services/defect-api-service.service';
import { CarService } from 'src/app/car/services/car.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit, OnDestroy {

  unsubscribeOnDestroy$ = new Subject<void>();
  defectServicesFromDataStore: Service[] = [];
  defectServicesFromSharedService: string[] = [];

  constructor(private defectServicesQuery: DefectServicesQuery, private defectApiServiceService: DefectApiServiceService) { }

  ngOnInit() {
    this.defectServicesQuery
      .selectDefectServices()
      .pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(defectServices => {
        this.defectServicesFromDataStore = defectServices;
      });

    this.defectApiServiceService
      .defectServices$
      .pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(defectServices => this.defectServicesFromSharedService = defectServices);
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next();
    this.unsubscribeOnDestroy$.complete();
  }

  serviceIsDefective_dataStore(serviceName: string): boolean {
    return this.defectServicesFromDataStore.find(service => service.name === serviceName && service.isDefective ) !== undefined;
  }

  serviceIsDefective_angularService(): boolean {
    return this.defectServicesFromSharedService.find(service => service === CarService.serviceName) !== undefined;
  }

  getDefectServicesMessage(): string {
    const defectiveServiceNames = this.defectServicesFromDataStore
      .filter(service => service.isDefective)
      .map(service => service.name);

    return `Er zijn defecte services gedetecteerd en gecommuniceerd door een data store framework: ${defectiveServiceNames.join(', ')}`;
  }

  get tooltipMessage(): string {
    return 'Kan geen connectie maken met de server';
  }

}
