import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefectServicesQuery } from '../../../akita/defect-services.query';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Service } from '../../../akita/defect-services.model';
import { DefectApiServiceService } from '../../services/defect-api-service.service';

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

  serviceIsDefective_angularService(): boolean {
    return this.defectServicesFromSharedService.length > 0;
  }

  serviceIsDefective_dataStore(): boolean {
    return this.defectServicesFromDataStore.find(service => service.isDefective) !== undefined;
  }

  getDefectServicesMessage(): string {
    const defectiveServiceNames = this.defectServicesFromDataStore
      .filter(service => service.isDefective)
      .map(service => service.name);

    return `Er zijn defecte services gedetecteerd en gecommuniceerd door een data store framework: ${defectiveServiceNames.join(', ')}`;
  }

}
