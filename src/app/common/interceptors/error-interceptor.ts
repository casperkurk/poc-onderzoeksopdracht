import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { DefectApiServiceService } from '../services/defect-api-service.service';
import { ApiServiceUtil } from '../util/api-service-util';
import { CarService } from 'src/app/car/services/car.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private defectApiServiceService: DefectApiServiceService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.requestIsForCarService(req.url))
            return next.handle(req);

        return next.handle(req).pipe(
                tap(
                    (event: HttpEvent<any>) => { },
                    (error: any) => {
                        if (error instanceof HttpErrorResponse && (error.status === 0 || error.status === 504)) {
                            this.defectApiServiceService.defectServiceDetected(req.url);
                        }
                    }
                )
        );
    }

    private requestIsForCarService(requestUrl: string): boolean {
        return ApiServiceUtil.getServiceName(requestUrl) === CarService.serviceName;
    }
}
