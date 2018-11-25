import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OrderService } from '../../order/services/order.service';

@Injectable({
  providedIn: 'root'
})
export class DefectiveServiceGuard implements CanActivate {

  constructor(private orderService: OrderService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.orderService
      .checkHealth()
      .pipe(
        map(response => true),
        catchError(error => {
          this.router.navigate(['/autos']);
          return of(false);
        }
      ));
  }
}
