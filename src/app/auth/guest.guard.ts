import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate, CanActivateChild {
  private store = inject(AuthStore)

  constructor(private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      return this.isUnauthenticated();
  }
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.isUnauthenticated();
  }
  private isUnauthenticated(): boolean {
    if (!this.store.isAuthenticated()) {
      return true
    }

    this.router.navigate(["dashboard"])

    return false
  }  
}
