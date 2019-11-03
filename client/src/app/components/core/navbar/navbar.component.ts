import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/service/auth.service";
import {StoreService} from "../../../shared/service/store.service";
import {Observable} from "rxjs";
import {User} from "../../../shared/state/user.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  template: `
      <nav *ngIf="user$ | async as user" class="navbar is-active" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-start">
                  <a class="navbar-item" routerLink="/profile" routerLinkActive="is-active">
                      Home
                  </a>

                  <a class="navbar-item" *ngIf="user.role === 'DOCTOR'" routerLink="/patient" routerLinkActive="is-active">
                      Patients
                  </a>

                  <a class="navbar-item" *ngIf="user.role === 'DOCTOR'" routerLink="/caretaker" routerLinkActive="is-active">
                      Caretakers
                  </a>

                  <a class="navbar-item" routerLink="/medication" routerLinkActive="is-active">
                      Medications
                  </a>
              </div>

              <div class="navbar-end">
                  <div class="navbar-item">
                      Hello, {{ user.firstName }} {{ user.lastName }}
                  </div>
                  <div class="navbar-item">
                      <div class="buttons">
                          <a class="button is-light" (click)="logout()">
                              Logout
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private router: Router, private auth: AuthService, private store: StoreService) { }

  ngOnInit() {
    this.user$ = this.store.select().pipe(map(state => state.user));
  }

  logout() {
    this.auth.clearToken();
    this.store.selectOnce().subscribe(state => {
      state.user = null;
      this.store.mutate(state);

      this.router.navigate(['/login'])
    });
  }
}
