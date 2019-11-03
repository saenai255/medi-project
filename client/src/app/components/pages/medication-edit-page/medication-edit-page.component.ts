import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Caretaker} from "../../../shared/state/user.model";
import {UserService} from "../../../shared/service/user.service";
import {StoreService} from "../../../shared/service/store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, tap} from "rxjs/operators";
import {Medication} from "../../../shared/state/medication.model";
import {MedicationService} from "../../../shared/service/medication.service";

@Component({
  selector: 'app-medication-edit-page',
  template: `
    <app-navbar></app-navbar>
    <app-medication-form (save)="onSave($event)" [medication]="medication$ | async"></app-medication-form>
  `,
  styles: []
})
export class MedicationEditPageComponent implements OnInit {
  medication$: Observable<Medication>;

  constructor(private medicationService: MedicationService, private store: StoreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.medication$ = this.store.select().pipe(
      map(state => state.viewedMedication),
      filter(medication => !!medication)
    );
    this.route.params.subscribe(params => this.medicationService.fetchMedication(params.id));
  }

  onSave(medication: Medication) {
    this.medicationService.saveMedication(medication);
  }


}
