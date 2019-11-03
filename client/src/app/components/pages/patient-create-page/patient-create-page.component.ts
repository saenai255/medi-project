import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../shared/service/user.service";
import {MedicationService} from "../../../shared/service/medication.service";
import {StoreService} from "../../../shared/service/store.service";
import {Observable} from "rxjs";
import {Medication} from "../../../shared/state/medication.model";
import {Caretaker, Patient} from "../../../shared/state/user.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-patient-create-page',
  template: `
    <app-navbar></app-navbar>
    <app-patient-form [medications]="medications$ | async" [caretakers]="caretakers$ | async" (save)="onSave($event)"></app-patient-form>
  `,
  styles: []
})
export class PatientCreatePageComponent implements OnInit {
  medications$: Observable<Medication[]>;
  caretakers$: Observable<Caretaker[]>;

  constructor(private userService: UserService, private medicationService: MedicationService, private store: StoreService) { }

  ngOnInit() {
    this.medications$ = this.store.select().pipe(map(state => state.medications));
    this.caretakers$ = this.store.select().pipe(map(state => state.caretakers));

    this.userService.fetchAllCaretakers();
    this.medicationService.fetchAllMedications();
  }

  onSave(patient: Patient & { caretaker: Caretaker }) {
    console.log(patient);
    const patientToSave: any = patient;
    patientToSave.caretakerId = patient.caretaker.id;

    this.userService.savePatient(patientToSave);
  }

}
