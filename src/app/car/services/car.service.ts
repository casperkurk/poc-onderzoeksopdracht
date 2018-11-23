import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  public static readonly serviceName = 'carservice';
  public static readonly baseUrl = 'http://localhost:10010';

  constructor(private http: HttpClient) { }

  public getCars(): Observable<HttpResponse<any>> {
    const url = `api/${CarService.serviceName}/cars`;
    return this.http.get<HttpResponse<any>>(url, {observe: 'response'});
  }

  public checkHealth(): Observable<any> {
    const url = `api/${CarService.serviceName}/checkhealth`;
    return this.http
      .get<any>(url, {observe: 'response'})
      .pipe(
        catchError((error: HttpResponse<any>) => {
          if (error.status === 0)
            return throwError(CarService.serviceName);

          return throwError(error);
        })
      );
  }
}
