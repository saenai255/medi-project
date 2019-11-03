import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Caretaker, Patient} from "../../../shared/state/user.model";
import {Medication, MedicationPlan} from "../../../shared/state/medication.model";

@Component({
  selector: 'app-caretaker-form',
  template: `
      <form class="form">
          <label class="checkbox">
              <input type="checkbox" name="male" [(ngModel)]="caretaker.male">
              Caretaker is male
          </label>

          <div class="two-cols">
              <div>
                  First Name
                  <input name="firstName" [(ngModel)]="caretaker.firstName" type="text" class="input">
              </div>
              <div>
                  Last Name
                  <input name="lastName" [(ngModel)]="caretaker.lastName" type="text" class="input">
              </div>
          </div>

          <div class="two-cols">
              <div>
                  Birth Name
                  <input name="birthName" [(ngModel)]="caretaker.birthName" type="text" class="input">
              </div>
              
              <div>
                  Birth Date
                  <input name="birthDate" [(ngModel)]="caretaker.birthDate" type="date" class="input">
              </div>
          </div>

          <div>
              Address
              <input name="address" [(ngModel)]="caretaker.address" type="text" class="input">
          </div>

          <div class="two-cols">
              <div>
                  Username
                  <input name="username" [(ngModel)]="caretaker.username" type="text" class="input">
              </div>
              <div>
                  Password
                  <input name="password" [(ngModel)]="caretaker.password" type="password" class="input">
              </div>
          </div>

          <br>

          <button class="button" (click)="onSave()">Save</button>
      </form>
  `,
  styles: [`
    .two-cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 15px;
    }
    
    form {
        max-width: 50%;
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-row-gap: 20px;
    }
    
    select {
        width: 100%;
    }
  `]
})
export class CaretakerFormComponent implements OnInit {
  @Input() caretaker?: Caretaker;
  @Output() save = new EventEmitter<Caretaker>();

  ngOnInit() {
    if (!this.caretaker) {
      this.caretaker = {
        id: undefined,
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        male: true,
        birthName: '',
        username: '',
        password: '',
        role: undefined,
        patients: undefined
      }
    }
  }

  onSave() {
    this.save.emit(this.caretaker);
  }
}
