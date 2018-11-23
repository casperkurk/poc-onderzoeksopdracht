import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public static readonly serviceName = 'orderservice';

  constructor(private http: HttpClient) { }

  public checkHealth(): Observable<any> {
    const url = `api/${OrderService.serviceName}/checkhealth`;
    return this.http
      .get<any>(url, {observe: 'response'})
      .pipe(
        catchError((error: HttpResponse<any>) => {
          if (error.status === 0)
            return throwError(OrderService.serviceName);

          return throwError(error);
        })
      );
  }
}
