import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MotorcycleService } from './motorcycle/services/motorcycle.service';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { Subject, Observable, empty, forkJoin, OperatorFunction, observable, of } from 'rxjs';
import { akitaDevtools } from '@datorama/akita';
import { ServiceName, DefectServices } from './akita/defect-services.model';
import { DefectServicesQuery } from './akita/defect-services.query';
import { DefectServicesService } from './akita/defect-services.service';
import { HttpResponse } from '@angular/common/http';
import { CarService } from './car/services/car.service';
import { OrderService } from './order/services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  unsubscribeOnDestroy$ = new Subject<void>();

  constructor(
    private motorcycleService: MotorcycleService,
    private carService: CarService,
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
      interval(2000)
        .pipe(
          takeUntil(this.unsubscribeOnDestroy$),
          startWith(0),
          switchMap(() => forkJoin(
              this.motorcycleService.checkHealth().pipe(this.handleError()),
              // this.carService.checkHealth().pipe(this.handleError()),
              this.orderService.checkHealth().pipe(this.handleError())
        )))
        .subscribe((responses: HttpResponse<string>[]) => {
          this.handleOkResponses(responses);
        }
      );
  }

  private handleError(): OperatorFunction<any, any> {
    return catchError(error => {
      this.defectServicesService.updateDefectServices(this.defectServicesQuery.getActive(), error as ServiceName, true);
      return of(error);
    });
  }

  private handleOkResponses(responses: any[]) {
    responses.forEach(response => {
      if (typeof response === 'string') return;

      this.defectServicesService
        .updateDefectServices(this.defectServicesQuery.getActive(), response.body as ServiceName, false);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next();
    this.unsubscribeOnDestroy$.complete();
  }
}
