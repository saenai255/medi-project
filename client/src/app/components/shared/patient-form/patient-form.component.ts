import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Caretaker, Patient} from "../../../shared/state/user.model";
import {Medication, MedicationPlan} from "../../../shared/state/medication.model";

@Component({
  selector: 'app-patient-form',
  template: `
    <form class="form">
        <label class="checkbox">
            <input type="checkbox" name="male" [(ngModel)]="patient.male">
            Patient is male
        </label>
        
        <div class="two-cols">
            <div>
                First Name
                <input name="firstName" [(ngModel)]="patient.firstName" type="text" class="input">
            </div>
            <div>
                Last Name
                <input name="lastName" [(ngModel)]="patient.lastName" type="text" class="input">
            </div>
        </div>

        <div class="two-cols">
            <div>
                Birth Name
                <input name="birthName" [(ngModel)]="patient.birthName" type="text" class="input">
            </div>
            <div>
                Caretaker
                <div class="select">
                    <select name="caretaker" [(ngModel)]="caretaker">
                        <option *ngFor="let caretaker of caretakers" [value]="caretaker">{{ caretaker.firstName }} {{ caretaker.lastName }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            Address
            <input name="address" [(ngModel)]="patient.address" type="text" class="input">
        </div>

        <div class="two-cols">
            <div>
                Username
                <input name="username" [(ngModel)]="patient.username" type="text" class="input">
            </div>
            <div>
                Password
                <input name="password" [(ngModel)]="patient.password" type="password" class="input">
            </div>
        </div>

        <div>
            Medical Record:
            <textarea class="textarea" [(ngModel)]="patient.medicalRecord" name="medicalRecord" rows="5"></textarea>
        </div>

        <div class="two-cols">
            <div>
                Birth Date
                <input name="birthDate" [(ngModel)]="patient.birthDate" type="date" class="input">
            </div>
        </div>

        <hr>

        <div class="two-cols">
            Medication Plans
            <button class="button" (click)="patient.medicationPlans.push({ medication: { id: undefined }, dailyDosage: 1, period: '' })">Add</button>
        </div>
        
        <div class="two-cols medication-plans" *ngFor="let mp of patient.medicationPlans">
            <div>
                Period
                <input name="period" [(ngModel)]="mp.period" type="date" class="input">
            </div>
            
            <div>
                Daily Dosage
                <input name="dosage" [(ngModel)]="mp.dailyDosage" type="number" min="1" class="input">
            </div>
            
            <div>
                Medication
                <div class="select">
                    <select name="medication" [(ngModel)]="mp.medication.id">
                        <option *ngFor="let medication of medications" [value]="medication.id">{{ medication.name }}</option>
                    </select>
                </div>
            </div>

            <button class="button remove-medication-plan-button" (click)="remove(mp)" >Remove</button>
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
    
    .remove-medication-plan-button {
        margin-top: 24px;
    }
    
    .medication-plans {
        display: grid;
        grid-row-gap: 20px;
    }
    
    form {
        max-width: 50%;
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-row-gap: 20px;
    }
    
    .select {
        width: 100%;
    }
    
    select {
        width: 100%;
    }
  `]
})
export class PatientFormComponent implements OnInit, OnChanges {
  @Input() caretakers: Caretaker[];
  @Input() medications: Medication[];
  @Input() patient?: Patient;
  @Output() save = new EventEmitter<Patient & { caretaker: Caretaker }>();

  caretaker: Caretaker;

  ngOnInit() {
    if (!this.patient) {
      this.patient = {
        id: undefined,
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        male: true,
        birthName: '',
        medicationPlans: [],
        username: '',
        medicalRecord: '',
        password: '',
        role: undefined
      }
    }
  }

  onSave() {
    this.save.emit({ ...this.patient, caretaker: this.caretaker });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.medications && !changes.medications.firstChange) {
      this.caretaker = this.getCaretaker();
    }

    if (changes.patient) {
      console.log(this.patient);
    }
  }

  private getCaretaker(): Caretaker {
    if (this.caretakers.length === 0) {
      return undefined;
    }

    if (!this.patient) {
      return this.caretakers[0];
    }

    const caretaker = this.caretakers.find(user => user.patients.map(p => p.id).find(id => id === this.patient.id));
    if (caretaker) {
      return caretaker;
    }

    return this.caretakers[0];
  }

  remove(medicationPlan: MedicationPlan) {
    this.patient.medicationPlans = this.patient.medicationPlans.filter(mp => mp !== medicationPlan);
  }

}
