import {Component, Input, OnInit} from '@angular/core';
import {Caretaker, Patient, User} from "../../../shared/state/user.model";

@Component({
  selector: 'app-user-presentation-table',
  template: `
      <button *ngIf="canEdit" [routerLink]="'/' + user.role.toLowerCase() + '/' + user.id + '/edit'" class="button">Edit</button>
      <div class="grid">
          <table class="table">
              <tr>
                  <th>First Name:</th>
                  <td>{{ user.firstName }}</td>
              </tr>
              <tr>
                  <th>Last Name:</th>
                  <td>{{ user.lastName }}</td>
              </tr>
              <tr>
                  <th>Birth Name:</th>
                  <td>{{ user.birthName }}</td>
              </tr>
              <tr>
                  <th>Birth Date:</th>
                  <td>{{ user.birthDate }}</td>
              </tr>
              <tr>
                  <th>Address:</th>
                  <td>{{ user.address }}</td>
              </tr>
              <tr>
                  <th>Gender:</th>
                  <td>{{ user.male ? 'Male' : 'Female' }}</td>
              </tr>
              <tr>
                  <th>Authorization:</th>
                  <td>{{ user.role }}</td>
              </tr>
              <tr>
                  <th>Username:</th>
                  <td>{{ user.username }}</td>
              </tr>
          </table>
          
          <div *ngIf="user.role === 'PATIENT'">
              Medical record: {{ patient.medicalRecord }}
              <br>
              <br>
              
              <div *ngIf="patient.medicationPlans && patient.medicationPlans.length > 0">
                  Medication Plans:
                  <table class="table">
                      <thead>
                      <th>Medication</th>
                      <th>Period</th>
                      <th>Daily dosage</th>
                      </thead>
                      <tbody>
                      <tr *ngFor="let mp of patient.medicationPlans">
                          <td [routerLink]="'/medication/' + mp.medication.id" class="clickable">{{ mp.medication.name }}</td>
                          <td>{{ mp.period }}</td>
                          <td>{{ mp.dailyDosage }}</td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          
          <div *ngIf="user.role === 'CARETAKER'">
              Patients:
              <app-user-list [users]="caretaker.patients"></app-user-list>
          </div>
      </div>
  `,
  styleUrls: ['./user-presentation-table.component.scss']
})
export class UserPresentationTableComponent {
  @Input() user: User;
  @Input() canEdit = false;

  get patient(): Patient {
    return this.user as Patient;
  }

  get caretaker(): Caretaker {
    return this.user as Caretaker;
  }
}
