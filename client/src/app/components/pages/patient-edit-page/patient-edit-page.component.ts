import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Medication} from "../../../shared/state/medication.model";
import {Caretaker, Patient} from "../../../shared/state/user.model";
import {UserService} from "../../../shared/service/user.service";
import {MedicationService} from "../../../shared/service/medication.service";
import {StoreService} from "../../../shared/service/store.service";
import {filter, map, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-patient-edit-page',
  template: `
      <app-navbar></app-navbar>
      <app-patient-form [medications]="medications$ | async" [caretakers]="caretakers$ | async" [patient]="patient$ | async" (save)="onSave($event)"></app-patient-form>
  `,
  styles: []
})
export class PatientEditPageComponent implements OnInit {
  medications$: Observable<Medication[]>;
  caretakers$: Observable<Caretaker[]>;
  patient$: Observable<Patient>;

  constructor(private userService: UserService, private medicationService: MedicationService, private store: StoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.medications$ = this.store.select().pipe(map(state => state.medications));
    this.caretakers$ = this.store.select().pipe(map(state => state.caretakers));
    this.patient$ = this.store.select().pipe(
      map(state => state.viewedUser as Patient),
      filter(user => !!user),
      tap(user => user.role !== 'PATIENT' && this.router.navigateByUrl('/profile'))
    );


    this.route.params.subscribe(params => this.userService.fetchUser(params.id));
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
