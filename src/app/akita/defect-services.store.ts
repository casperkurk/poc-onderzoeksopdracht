import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState, getInitialActiveState, ID, push, toggle, transaction } from '@datorama/akita';
import { DefectServices, createDefectServices, Service } from './defect-services.model';

export interface DefectServicesState extends EntityState<DefectServices>, ActiveState {}

const state = {
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'defectServices' })
export class DefectServicesStore extends EntityStore<DefectServicesState, DefectServices> {
  constructor() {
    super(state);
    this.addNewDefectiveServices();
  }

  @transaction()
  addNewDefectiveServices() {
    const newDefectiveServices = createDefectServices();
    this.add(newDefectiveServices);
    this.setActive(newDefectiveServices.id);
  }

  toggleServiceNames(service: Service, activeDefectiveServicesID: ID) {
    this.update(activeDefectiveServicesID, defectiveServices => {
      return {
        ...defectiveServices,
        serviceNames: toggle(defectiveServices.services, service)
      };
    });
  }
}
