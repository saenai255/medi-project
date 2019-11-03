import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StoreService} from "../service/store.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(private store: StoreService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.store.selectOnce().pipe(map(state => state.user)).toPromise();

    if (user) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

}
