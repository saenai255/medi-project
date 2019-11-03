import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../shared/service/user.service";
import {StoreService} from "../../../shared/service/store.service";
import {Patient, User} from "../../../shared/state/user.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-patient-list',
  template: `
    <app-navbar></app-navbar>
    
    <button class="button" routerLink="/patient/new">Add New</button>
    <app-user-list [users]="patients$ | async" [canDelete]="true" (delete)="onDelete($event)"></app-user-list>
  `,
  styleUrls: ['./patient-list-page.component.scss']
})
export class PatientListPageComponent implements OnInit {
  patients$: Observable<Patient[]>;

  constructor(private userService: UserService, private store: StoreService) { }

  ngOnInit() {
    this.patients$ = this.store.select().pipe(map(state => state.patients));
    this.userService.fetchAllPatients();
  }

  onDelete(user: User) {
    if(!confirm('By deleting this, all other related entities will also be removed. Proceed?')) {
      return;
    }

    this.userService.deleteUser(user);
  }

}
