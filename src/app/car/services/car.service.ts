import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  public static readonly serviceName = 'carservice';

  constructor(private http: HttpClient) { }

  public getCars(): Observable<HttpResponse<any>> {
    const url = 'api/carservice/cars';
    return this.http.get<HttpResponse<any>>(url, {observe: 'response'});
  }
}
