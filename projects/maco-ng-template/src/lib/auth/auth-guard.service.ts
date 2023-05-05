import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private auth: AuthService,
    private router: Router,
    private refreshTokenService: RefreshTokenService) {}

  canActivate(_: any, state: RouterStateSnapshot): boolean {
    if (this.auth.isRefreshTokenExpired()) {
      this.refreshTokenService.removeAuthData();
      this.router.navigate(['login'], {
        queryParams: {
          redirectUrl: state.url
        }
      }).then( () => {
        return false;
      });
    }
    return true;
  }
}
