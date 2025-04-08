import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getRole();
    const expectedRole = route.data['expectedRole'];

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ If route has role restriction
    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/unauthorized']); // Optional: create unauthorized page
      return false;
    }

    return true;
  }
}
