import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Caretaker, Patient, User} from "../../../shared/state/user.model";
import {UserService} from "../../../shared/service/user.service";
import {StoreService} from "../../../shared/service/store.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-caretaker-list',
  template: `    
    <app-navbar></app-navbar>

    <button class="button" routerLink="/caretaker/new">Add New</button>
    <app-user-list [users]="caretakers$ | async" [canDelete]="true" (delete)="onDelete($event)"></app-user-list>
  `,
  styleUrls: ['./caretaker-list-page.component.scss']
})
export class CaretakerListPageComponent implements OnInit {
  caretakers$: Observable<Caretaker[]>;

  constructor(private userService: UserService, private store: StoreService) { }

  ngOnInit() {
    this.caretakers$ = this.store.select().pipe(map(state => state.caretakers));
    this.userService.fetchAllCaretakers();
  }

  onDelete(user: User) {
    if(!confirm('By deleting this, all other related entities will also be removed. Proceed?')) {
      return;
    }

    this.userService.deleteUser(user);
  }

}
