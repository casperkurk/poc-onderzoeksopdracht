import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState, getInitialActiveState, transaction } from '@datorama/akita';
import { DefectServices, createDefectServices } from './defect-services.model';

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
}
