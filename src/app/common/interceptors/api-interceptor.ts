import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { ApiServiceUtil } from '../util/api-service-util';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: ApiServiceUtil.getApiUrl(req.url) });

        return next.handle(apiReq);
    }

}
