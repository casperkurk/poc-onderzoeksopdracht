import { Injectable } from '@angular/core';
import { ID, update } from '@datorama/akita';
import { DefectServicesStore } from './defect-services.store';
import { createDefectServices, Service, DefectServices, ServiceName } from './defect-services.model';

@Injectable({
    providedIn: 'root'
})
export class DefectServicesService {
  constructor(private defectServicesStore: DefectServicesStore) {}

  add() {
    this.defectServicesStore.addNewDefectiveServices();
  }

  setActiveDefectiveServices(id: ID) {
    this.defectServicesStore.setActive(id);
  }

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
