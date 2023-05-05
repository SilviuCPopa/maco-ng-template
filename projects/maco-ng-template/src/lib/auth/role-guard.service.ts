import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AppRoles } from './auth.interface';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService {

   currentRole: AppRoles[] = [];
   authData: any = JSON.parse(localStorage.getItem('user') ?? '');

  constructor(public auth: AuthService, public router: Router) {
    if (this.authData) {
      this.currentRole = JSON.parse(this.authData.user_roles);
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    if ( !this.auth.isAuthenticated() || !this.hasRole(expectedRole )) {
        this.router.navigate(['login']).then( () => {
          return false;
        });
    }
    return true;
}

  hasRole(expectedRole: string): AppRoles | undefined {
    return this.currentRole.find( (item: AppRoles) => item.name === expectedRole);
  }
}
