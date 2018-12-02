import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  public static readonly serviceName = 'motorcycleservice';

  constructor(private http: HttpClient) { }

  public getMotorcycles(): Observable<Array<any>> {
    const url = 'api/motorcycleservice/motorcycles';
    return this.http.get<Array<any>>(url);
  }

  public checkHealth(): Observable<any> {
    const url = `api/${MotorcycleService.serviceName}/checkhealth`;
    return this.http
      .get<any>(url, {observe: 'response'})
      .pipe(
        catchError((error: HttpResponse<any>) => {
          if (error.status === 0 || error.status === 504)
            return throwError(MotorcycleService.serviceName);

          return throwError(error);
        })
      );
  }
}
