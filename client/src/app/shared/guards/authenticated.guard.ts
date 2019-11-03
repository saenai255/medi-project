import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StoreService} from "../service/store.service";
import {map} from "rxjs/operators";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: StoreService, private router: Router, private auth: AuthService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let user = await this.store.selectOnce().pipe(map(state => state.user)).toPromise();

    if (!user && this.auth.getToken()) {
      await this.auth.login();
      user = await this.store.selectOnce().pipe(map(state => state.user)).toPromise();
    }

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
