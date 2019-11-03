import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../shared/service/store.service";
import {MedicationService} from "../../../shared/service/medication.service";
import {Medication} from "../../../shared/state/medication.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-medication-create-page',
  template: `
    <app-navbar></app-navbar>
    <app-medication-form (save)="onSave($event)"></app-medication-form>
  `,
  styles: []
})
export class MedicationCreatePageComponent implements OnInit {
  constructor(private store: StoreService, private medicationService: MedicationService) { }

  ngOnInit() {
  }

  async onSave(medication: Medication) {
    await this.medicationService.saveMedication(medication);
  }

}
