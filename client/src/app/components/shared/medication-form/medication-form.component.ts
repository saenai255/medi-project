import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Medication} from "../../../shared/state/medication.model";

@Component({
  selector: 'app-medication-form',
  template: `
    <form class="form">
        <div>
            Name
            <input type="text" name="name" [(ngModel)]="medication.name" class="input">
        </div>

        <div>
            Dosage
            <input type="text" name="dosage" [(ngModel)]="medication.dosage" class="input">
        </div>

        <div>
            Side Effects
            <input type="text" name="sideEffects" [(ngModel)]="medication.sideEffects" class="input">
        </div>

        <button class="button" (click)="save.emit(medication)">Save</button>
    </form>
  `,
  styles: [`
    form {
        display: grid;
        grid-row-gap: 20px;
        max-width: 400px;
    }
  `]
})
export class MedicationFormComponent implements OnInit {
  @Input() medication?: Medication;
  @Output() save = new EventEmitter<Medication>();

  constructor() { }

  ngOnInit() {
    if (!this.medication) {
      this.medication = {
        name: '',
        sideEffects: '',
        dosage: '',
        id: undefined
      }
    }
  }

}
