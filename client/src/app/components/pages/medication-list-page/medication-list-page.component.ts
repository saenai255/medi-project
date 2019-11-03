import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../shared/service/store.service";
import {MedicationService} from "../../../shared/service/medication.service";
import {Observable} from "rxjs";
import {Medication} from "../../../shared/state/medication.model";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-medication-list-page',
  template: `
    <app-navbar></app-navbar>

    <button *ngIf="canDelete$ | async" class="button" routerLink="/medication/new">Add New</button>
    <app-medication-list [canDelete]="canDelete$ | async" (delete)="onDelete($event)" [medications]="medications$ | async"></app-medication-list>
  `,
  styles: []
})
export class MedicationListPageComponent implements OnInit {
  medications$: Observable<Medication[]>;
  canDelete$: Observable<boolean>;

  constructor(private store: StoreService, private medicationService: MedicationService) { }

  ngOnInit() {
    this.canDelete$ = this.store.select().pipe(map(state => state.user), filter(user => !!user ), map(user => user.role === 'DOCTOR'));
    this.medications$ = this.store.select().pipe(map(state => state.medications));
    this.medicationService.fetchAllMedications();
  }

  onDelete(medication: Medication) {
    if(!confirm('By deleting this, all other related entities will also be removed. Proceed?')) {
      return;
    }

    this.medicationService.deleteMedication(medication);
  }

}
