import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Medication} from "../../../shared/state/medication.model";

@Component({
  selector: 'app-medication-list',
  template: `
    <table class="table">
        <thead>
        <th>#</th>
        <th>Name</th>
        <th>Dosage</th>
        <th>Side Effects</th>
        <th *ngIf="canDelete"></th>
        </thead>
        <tbody>
            <tr *ngFor="let med of medications">
                <td [routerLink]="'/medication/' + med.id">{{ med.id }}</td>
                <td>{{ med.name }}</td>
                <td>{{ med.dosage }}</td>
                <td>{{ med.sideEffects }}</td>
                <td *ngIf="canDelete" (click)="delete.emit(med)"><a class="delete"></a></td>
            </tr>
        </tbody>
    </table>
  `,
  styles: [
    `
      tr:hover td:first-child {
          background: #cbcbcb30;
          cursor: pointer;
      }
    `
  ]
})
export class MedicationListComponent {
  @Input() medications: Medication[];
  @Input() canDelete = false;
  @Output() delete = new EventEmitter<Medication>();
}
