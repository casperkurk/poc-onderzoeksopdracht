import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  constructor(private http: HttpClient) { }

  public getMotorcycles(): Observable<any> {
    const url = 'api/motorcycleservice/motorcycles';
    return this.http.get<any>(url);
  }
}
