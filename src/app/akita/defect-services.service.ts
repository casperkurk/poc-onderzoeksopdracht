import { Injectable } from '@angular/core';
import { update } from '@datorama/akita';
import { DefectServicesStore } from './defect-services.store';
import { DefectServices, ServiceName } from './defect-services.model';

@Injectable({
    providedIn: 'root'
})
export class DefectServicesService {
  constructor(private defectServicesStore: DefectServicesStore) {}

  updateDefectServices(defectServices: DefectServices, serviceName: ServiceName, isDefective: boolean) {
    const service = defectServices.services.find(serv => serv.name === serviceName);
    this.defectServicesStore.update(defectServices.id, services => {
      return {
        ...services,
        services: update(defectServices.services, service, {isDefective})
      };
    });
  }
}
