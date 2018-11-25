import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MotorcycleService } from '../../motorcycle/services/motorcycle.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DefectiveServiceGuard implements CanActivate {

  constructor(private motorcycleService: MotorcycleService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.motorcycleService
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
