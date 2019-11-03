import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/state/user.model";

@Component({
  selector: 'app-user-list',
  template: `
    <table class="table">
        <thead>
        <th>#</th>
        <th>Authorization</th>
        <th>Full Name</th>
        <th>Birth Name</th>
        <th>Birth Date</th>
        <th>Username</th>
        <th>Gender</th>
        <th>Address</th>
        <th *ngIf="canDelete"></th>
        </thead>
        <tbody>
            <tr *ngFor="let user of users">
                <td [routerLink]="'/user/' + user.id">{{ user.id }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.firstName }} {{ user.lastName }}</td>
                <td>{{ user.birthName }}</td>
                <td>{{ user.birthDate }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.male ? 'Male' : 'Female' }}</td>
                <td>{{ user.address }}</td>
                <td *ngIf="canDelete" (click)="delete.emit(user)"><a class="delete"></a></td>
            </tr>
        </tbody>
    </table>
  `,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[];
  @Input() canDelete = false;
  @Output() delete = new EventEmitter<User>();
}
