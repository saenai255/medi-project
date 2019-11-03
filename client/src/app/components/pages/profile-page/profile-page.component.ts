import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../shared/service/store.service";
import {Observable} from "rxjs";
import {User} from "../../../shared/state/user.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-profile-page',
  template: `
    <app-navbar></app-navbar>
    
    It seems you are...
    <app-user-presentation-table [user]="user$ | async"></app-user-presentation-table>
  `,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.user$ = this.store.select().pipe(map(state => state.user));
  }

}
