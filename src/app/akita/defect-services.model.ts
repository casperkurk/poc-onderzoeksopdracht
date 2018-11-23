import { ID } from '@datorama/akita';

let id = 1;

export interface DefectServices {
  id: ID;
  services: Service[];
}

/**
 * A factory function that creates a defectService
 */
export function createDefectServices() {
  return {
    id: id++,
    services: [
      { name: ServiceNames.Carservice, isDefective: false },
      { name: ServiceNames.Motorcycleservice, isDefective: false },
      { name: ServiceNames.Orderservice, isDefective: false },
    ]
  } as DefectServices;
}

export interface Service {
  name: ServiceName;
  isDefective: boolean;
}

export class ServiceNames {
  public static readonly Carservice = 'carservice';
  public static readonly Motorcycleservice = 'motorcycleservice';
  public static readonly Orderservice = 'orderservice';
}

export type ServiceName =
  | 'carservice'
  | 'motorcycleservice'
  | 'orderservice';
