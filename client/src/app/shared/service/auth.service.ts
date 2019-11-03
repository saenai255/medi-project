import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StoreService} from "./store.service";
import {environment} from "../../../environments/environment";
import {handleError} from "./error-handler";
import {User} from "../state/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private store: StoreService) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(username: string, password: string): void {
    localStorage.setItem('token', 'Basic ' + btoa(`${username}:${password}`))
  }

  public clearToken(): void {
    localStorage.removeItem('token');
  }

  public async login(): Promise<void> {
    const token = this.getToken();

    if (!token) {
      return;
    }

    const user = await this.http.get<User>('/api/user', { headers: { Authorization: token } }).toPromise()
      .catch(handleError(this.store))
      .catch(() => (this.clearToken(), null));

    if (!user) {
      return;
    }

    this.store.selectOnce().subscribe(state => {
      this.store.mutate({ ...state, user });
    });
  }
}
