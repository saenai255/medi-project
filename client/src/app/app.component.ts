import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-notifications></app-notifications>
    <div class="container-limited">
        <router-outlet></router-outlet>
    </div>
    
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
