import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Caretaker} from "../../../shared/state/user.model";
import {UserService} from "../../../shared/service/user.service";
import {StoreService} from "../../../shared/service/store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-caretaker-edit-page',
  template: `
    <app-navbar></app-navbar>
    <app-caretaker-form [caretaker]="caretaker$ | async" (save)="onSave($event)"></app-caretaker-form>
  `,
  styles: []
})
export class CaretakerEditPageComponent implements OnInit {
  caretaker$: Observable<Caretaker>;

  constructor(private userService: UserService, private store: StoreService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.caretaker$ = this.store.select().pipe(
      map(state => state.viewedUser as Caretaker),
      filter(user => !!user),
      tap(user => user.role !== 'CARETAKER' && this.router.navigateByUrl('/profile')));
    this.route.params.subscribe(params => this.userService.fetchUser(params.id));
  }

  onSave(caretaker: Caretaker) {
    this.userService.saveCaretaker(caretaker);
  }
}
