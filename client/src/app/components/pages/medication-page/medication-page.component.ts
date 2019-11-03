import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../shared/service/store.service";
import {MedicationService} from "../../../shared/service/medication.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Medication} from "../../../shared/state/medication.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-medication-page',
  template: `
    <app-navbar></app-navbar>
    <div *ngIf="medication$ | async as medication">
        <app-medication-table [canEdit]="canEdit$ | async" *ngIf="medication !== null" [medication]="medication"></app-medication-table>
    </div>
  `,
  styles: []
})
export class MedicationPageComponent implements OnInit {
  medication$: Observable<Medication>;
  canEdit$ : Observable<boolean>

  constructor(private store: StoreService, private medicationService: MedicationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.medication$ = this.store.select().pipe(map(state => state.viewedMedication));
    this.canEdit$ = this.store.select().pipe(map(state => state.user.role === 'DOCTOR'));
    this.route.params.subscribe(params => this.medicationService.fetchMedication(params.id))
  }

}
