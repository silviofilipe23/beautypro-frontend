import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, filter, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const USER_TOKEN = localStorage.getItem('USER_TOKEN') || '{}';
    const USER_ROLES = localStorage.getItem('USER_ROLES') || '{}';

    if (USER_TOKEN !== null && USER_TOKEN !== undefined) {
      if (
        USER_ROLES !== null &&
        USER_ROLES !== undefined &&
        USER_ROLES.length > 0
      ) {
        const authReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${USER_TOKEN}`),
        });

        return next.handle(authReq).pipe(
          catchError((err) => {
            console.log(err);

            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 && this.router.url !== '/login') {
                this.router.navigate(['/login']);
              }
            }
            return throwError(err);
          })
        );
      } else {
        return next.handle(request).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 && this.router.url !== '/login') {
                this.router.navigate(['/login']);
              }
            }
            return throwError(err);
          })
        );
      }
    } else {
      return next.handle(request).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 && this.router.url !== '/login') {
              this.router.navigate(['/login']);
            }
          }
          return throwError(err);
        })
      );
    }
  }
}
