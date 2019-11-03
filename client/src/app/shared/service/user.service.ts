import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {StoreService} from "./store.service";
import {Caretaker, Patient, User} from "../state/user.model";
import {Router} from "@angular/router";
import {handleError} from "./error-handler";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService, private store: StoreService, private router: Router) { }

  async fetchAllPatients(): Promise<void> {
    const patients = await this.http.get<Patient[]>('/api/patient', { headers: { Authorization: this.auth.getToken() } }).toPromise();
    const state = await this.store.selectOnce().toPromise();

    state.patients = patients;
    this.store.mutate(state);
  }

  async fetchAllCaretakers(): Promise<void> {
    const caretakers = await this.http.get<Caretaker[]>('/api/caretaker', { headers: { Authorization: this.auth.getToken() } }).toPromise();
    const state = await this.store.selectOnce().toPromise();

    state.caretakers = caretakers;
    this.store.mutate(state);
  }

  async deleteUser(user: User): Promise<void> {
    await this.http.delete('/api/user/' + user.id, { headers: { Authorization: this.auth.getToken() } }).toPromise();

    if (user.role === 'PATIENT') {
      return this.fetchAllPatients();
    }
  }

  async fetchUser(id: number): Promise<void> {
    const user = await this.http.get<User>('/api/user/' + id, { headers: { Authorization: this.auth.getToken() } })
      .toPromise()
      .catch(handleError(this.store));
    const state = await this.store.selectOnce().toPromise();

    state.viewedUser = user;
    this.store.mutate(state);
  }

  async savePatient(patient: Patient & { caretakerId: number }) {
    const user = await this.http.post<Patient>('/api/patient', patient, { headers: { Authorization: this.auth.getToken() } }).toPromise()
      .catch(handleError(this.store));
    this.router.navigateByUrl(`/user/${user.id}`);
  }

  async saveCaretaker(caretaker: Caretaker) {
    const user = await this.http.post<Caretaker>('/api/caretaker', caretaker, { headers: { Authorization: this.auth.getToken() } }).toPromise()
      .catch(handleError(this.store));
    this.router.navigateByUrl(`/user/${user.id}`);
  }
}
