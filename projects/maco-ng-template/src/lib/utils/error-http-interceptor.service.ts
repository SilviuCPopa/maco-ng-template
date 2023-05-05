import { AuthService } from './../auth/auth.service';


import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { RefreshTokenService } from '../auth';
import { AppNotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private notificationService: AppNotificationService,
    private refreshTokenService: RefreshTokenService,
    private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(this.addTokenHeader(request, this.authService.accessToken))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';

          if (error instanceof HttpErrorResponse && !request.url.includes('api/user_service/user/login') && error.status === 401) {
            return this.handle401Error(request, next);
          } else {
            if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error.message}`;
            }
            else {
              errorMsg = error.message;
            }
            this.notificationService.error(errorMsg);
            return observableThrowError(errorMsg);
          }
        })
      );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = this.authService.refreshToken;
      if (refreshToken) {
        return this.refreshTokenService.refreshTokenRequest().pipe(
          switchMap((token: any) => {
            if (token) {
              this.refreshTokenService.setAuthData(token);
              this.refreshTokenSubject.next(token.access_token);
              return next.handle(this.addTokenHeader(request, token.access_token));
            } else {
              this.logoutUser();
              return observableThrowError(() => new Error(''));
            }
          }),
          catchError((err) => {
            this.logoutUser();
            return observableThrowError(() => new Error(err));
          }),
          finalize(() => {
            this.isRefreshing = false;
          }));
      }
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((token: string) => {
          return next.handle(this.addTokenHeader(request, token));
        }));
    }
  }

  private logoutUser(): void {
    this.refreshTokenService.removeAuthData();
    this.router.navigate(['login']).then(() => {});
  }

  private addTokenHeader(request: HttpRequest<any>, token: string | null ): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
  }
}
