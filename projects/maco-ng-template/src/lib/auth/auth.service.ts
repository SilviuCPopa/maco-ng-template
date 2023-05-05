import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    if (this.accessToken) {
      return !this.jwtHelper.isTokenExpired(this.accessToken);
    }
    return !!this.accessToken;
  }

  public isRefreshTokenExpired(): boolean {
    if (this.refreshToken) {
      return this.jwtHelper.isTokenExpired(this.refreshToken);
    }
    return true;
  }

  get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
}
