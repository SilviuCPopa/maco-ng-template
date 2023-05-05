import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {

  constructor(private jwtHelper: JwtHelperService) {}

  registerData(response: AuthResponse): void {
    this.setUserData(response);
    this.setAuthData(response.responseObject);
  }

  refreshTokenRequest(): Observable<AuthResponse> {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    const body = this.buildRefreshTokenBody();
    xhr.open('POST', `${'REFRESH_TOKEN_HOST'}`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    return new Observable(observer => {
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState !== 4) {
          return;
        }

        if (this.status >= 200 && this.status < 300) {
          observer.next((JSON.parse(this.responseText)));
          observer.complete();
        } else {
          observer.error({
            status: this.status,
            statusText: this.statusText,
          });
          observer.complete();
        }
      });
      xhr.send(body);
    });
  }

  setAuthData(authResponse: any): void {
    localStorage.setItem(
      'refresh_token',
      authResponse.refresh_token
    );
    localStorage.setItem(
      'access_token',
      authResponse.access_token
    );
  }


  private buildRefreshTokenBody(): string {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set(`refresh_token`, localStorage.getItem('refresh_token') ?? '')
      .set(`client_id`, 'TOKEN.CLIENT_ID')
      .set(`client_secret`, 'TOKEN.CLIENT_SECRET');

    return body.toString();
  }

  removeAuthData(): void {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  private setUserData(authResponse: AuthResponse): void {
    const decodedJwt = this.jwtHelper.decodeToken(authResponse.responseObject.access_token);
    const userData = {
      user_email: decodedJwt.preferred_username,
      user_roles: JSON.stringify(decodedJwt.realm_access.roles),
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }
}
