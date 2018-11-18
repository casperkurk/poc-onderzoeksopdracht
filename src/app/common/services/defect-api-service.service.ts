import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiServiceUtil } from '../util/api-service-util';

@Injectable({
  providedIn: 'root'
})
export class DefectApiServiceService {
  private defectServiceNames = new Array<string>();
  private defectServicesState = new BehaviorSubject<string[]>([]);
  public defectServices$ = this.defectServicesState.asObservable();

  constructor() { }

  defectServiceDetected(requestUrl: string) {
    const defectServiceName = ApiServiceUtil.getServiceName(requestUrl);
    if (!this.defectServiceNames.find(service => service === defectServiceName))
      this.defectServiceNames.push(defectServiceName);

    console.log('defectServiceName: ', defectServiceName);
    this.defectServicesState.next(this.defectServiceNames);
  }
}