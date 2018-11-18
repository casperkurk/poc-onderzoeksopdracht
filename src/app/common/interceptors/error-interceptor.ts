import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { DefectApiServiceService } from '../services/defect-api-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private defectApiServiceService: DefectApiServiceService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
                tap(
                    (event: HttpEvent<any>) => { },
                    (error: any) => {
                        if (error instanceof HttpErrorResponse && error.status === 0) {
                            this.defectApiServiceService.defectServiceDetected(req.url);
                        }
                    }
                )
        );
    }
}
