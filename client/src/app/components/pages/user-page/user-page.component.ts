import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../shared/service/store.service";
import {UserService} from "../../../shared/service/user.service";
import {Observable} from "rxjs";
import {User} from "../../../shared/state/user.model";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-page',
  template: `
    <app-navbar></app-navbar>
    <div *ngIf="viewedUser$ | async as user">
        <app-user-presentation-table *ngIf="user !== null" [user]="user" [canEdit]="canEdit$ | async" ></app-user-presentation-table>
    </div>
  `,
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  viewedUser$: Observable<User>;
  canEdit$: Observable<boolean>;

  constructor(private store: StoreService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.viewedUser$ = this.store.select().pipe(map(state => state.viewedUser));
    this.canEdit$ = this.store.select().pipe(map(state => state.user.role === 'DOCTOR'));

    this.route.params.subscribe(params => {
      this.userService.fetchUser(+params['id'])
    });
  }

}
