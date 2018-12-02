import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MotorcycleService } from './motorcycle/services/motorcycle.service';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { Subject, forkJoin, OperatorFunction, of } from 'rxjs';
import { akitaDevtools } from '@datorama/akita';
import { ServiceName } from './akita/defect-services.model';
import { DefectServicesQuery } from './akita/defect-services.query';
import { DefectServicesService } from './akita/defect-services.service';
import { HttpResponse } from '@angular/common/http';
import { OrderService } from './order/services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  unsubscribeOnDestroy$ = new Subject<void>();
  loadingData = true;

  constructor(
    private motorcycleService: MotorcycleService,
    private orderService: OrderService,
    private ngZone: NgZone,
    private defectServicesQuery: DefectServicesQuery,
    private defectServicesService: DefectServicesService
  ) {
    akitaDevtools(ngZone);
  }

  ngOnInit(): void {
    this.listenForDefectiveServices();
  }

  private listenForDefectiveServices() {
      interval(5000)
        .pipe(
          takeUntil(this.unsubscribeOnDestroy$),
          startWith(0),
          switchMap(() => forkJoin(
              this.motorcycleService.checkHealth().pipe(this.handleError()),
              this.orderService.checkHealth().pipe(this.handleError())
        )))
        .subscribe((responses: HttpResponse<string>[]) => {
          this.handleOkResponses(responses);
        }
      );
  }

  private handleError(): OperatorFunction<any, any> {
    return catchError(error => {
      if (typeof error === 'string')
        this.defectServicesService.updateDefectServices(this.defectServicesQuery.getActive(), error as ServiceName, true);
      return of(error);
    });
  }

  private handleOkResponses(responses: any[]) {
    const currenDefectServicesSatus = this.defectServicesQuery.getActive();
    currenDefectServicesSatus.services.forEach(service => {
      if (!service.isDefective) return;

      const response = responses.find(resp => resp.body as ServiceName === service.name);
      if (!response) return;

      this.defectServicesService
        .updateDefectServices(this.defectServicesQuery.getActive(), response.body as ServiceName, false);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next();
    this.unsubscribeOnDestroy$.complete();
  }
}
