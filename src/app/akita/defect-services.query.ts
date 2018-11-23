import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DefectServicesState, DefectServicesStore } from './defect-services.store';
import { DefectServices, Service } from './defect-services.model';
import { combineLatest, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DefectServicesQuery extends QueryEntity<DefectServicesState, DefectServices> {
  constructor(protected store: DefectServicesStore) {
    super(store);
  }

  selectDefectServices(): Observable<Service[]> {
    return this.selectActive().pipe(
      map(defectServices => {
        return defectServices.services;
      })
    );
  }
}
