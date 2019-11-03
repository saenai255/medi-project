import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  template: `
      <div class="container">
          <div class="field">
              <label class="label">Username</label>
              <div class="control">
                  <input #username class="input" type="text" placeholder="Username goes here...">
              </div>
          </div>
          <div class="field">
              <label class="label">Password</label>
              <div class="control">
                  <input #password class="input" type="password" placeholder="Password goes here...">
              </div>
          </div>

          <div class="control">
              <button class="button is-link" (click)="login(username.value, password.value)">Login</button>
          </div>
      </div>
  `,
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private auth: AuthService, private router: Router) {
  }

  async login(username: string, password: string) {
    this.auth.setToken(username, password);
    await this.auth.login();
    this.router.navigateByUrl('/profile');
  }

}
