import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {StoreService} from "./store.service";
import {HttpClient} from "@angular/common/http";
import {Medication} from "../state/medication.model";
import {Router} from "@angular/router";
import {handleError} from "./error-handler";

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private authService: AuthService, private store: StoreService, private http: HttpClient, private router: Router) { }

  async fetchMedication(id: number): Promise<void> {
    const medication = await this.http.get<Medication>('/api/medication/' + id, { headers: { Authorization: this.authService.getToken() } }).toPromise();

    const state = await this.store.selectOnce().toPromise();
    state.viewedMedication = medication;

    this.store.mutate(state);
  }

  async fetchAllMedications(): Promise<void> {
    const medications = await this.http.get<Medication[]>('/api/medication/', { headers: { Authorization: this.authService.getToken() } }).toPromise();

    const state = await this.store.selectOnce().toPromise();
    state.medications = medications;

    this.store.mutate(state);
  }

  async deleteMedication(medication: Medication): Promise<void> {
    await this.http.delete('/api/medication/' + medication.id, { headers: { Authorization: this.authService.getToken() } }).toPromise();
    await this.fetchAllMedications();
  }

  async saveMedication(medication: Medication): Promise<void> {
    const output = await this.http.post<Medication>('/api/medication', medication, { headers: { Authorization: this.authService.getToken() } })
      .toPromise()
      .catch(handleError(this.store));
    this.router.navigateByUrl(`/medication/` + output.id);
  }
}
