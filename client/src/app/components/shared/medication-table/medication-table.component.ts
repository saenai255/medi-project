import {Component, Input, OnInit} from '@angular/core';
import {Medication} from "../../../shared/state/medication.model";

@Component({
  selector: 'app-medication-table',
  template: `
      <button *ngIf="canEdit" [routerLink]="'/medication/' + medication.id + '/edit'" class="button">Edit</button>

      <table class="table">
        <tbody>
        <tr>
            <th>Name</th>
            <td>{{ medication.name }}</td>
        </tr>
        <tr>
            <th>Dosage</th>
            <td>{{ medication.dosage }}</td>
        </tr>
        <tr>
            <th>Side Effects</th>
            <td>{{ medication.sideEffects }}</td>
        </tr>
        </tbody>
    </table>
  `,
  styles: []
})
export class MedicationTableComponent {
  @Input() medication: Medication;
  @Input() canEdit = false;
}
