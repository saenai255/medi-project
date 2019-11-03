import {Component} from '@angular/core';
import {UserService} from "../../../shared/service/user.service";
import {Caretaker} from "../../../shared/state/user.model";

@Component({
  selector: 'app-caretaker-create-page',
  template: `
    <app-navbar></app-navbar>
    <app-caretaker-form (save)="onSave($event)"></app-caretaker-form>
  `,
  styles: []
})
export class CaretakerCreatePageComponent {

  constructor(private userService: UserService) { }

  onSave(caretaker: Caretaker) {
    this.userService.saveCaretaker(caretaker);
  }

}
