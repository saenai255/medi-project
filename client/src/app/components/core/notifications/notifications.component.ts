import {Component, DoCheck, IterableDiffer, IterableDiffers, NgZone, OnInit} from '@angular/core';
import {StoreService} from "../../../shared/service/store.service";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-notifications',
  template: `
      <div class="notification-wrapper">
          <div *ngFor="let error of errors" [style.display]="error.display" class="notification is-danger has-text-right" style="max-width: 400px">
              {{ error.text }}
          </div>
      </div>
  `,
  styles: [`
      @keyframes NotificationAnimation{
          0%{
              transform: translateX(-450px);
          }
          10%{
              transform: translateX(-10px);
          }
          90%{
              transform: translateX(-10px);
          }
          100%{
              transform: translateX(-450px);
              display: none;
          }
      }

      .notification-wrapper {
          position: absolute;
          top: 65px;
      }

      .notification {
          z-index: 999;
          width: 400px;
          animation: NotificationAnimation 4s forwards linear;
      }
  `]
})
export class NotificationsComponent implements OnInit {
  errors = [];

  constructor(private store: StoreService, private zone: NgZone) {
  }

  ngOnInit() {
    this.store.select().pipe(
      map(state => state.error),
      filter(error => !!error),
      map(error => ({text: error, display: 'block'}))
    ).subscribe(error => {
      this.store.selectOnce().subscribe(state => this.store.mutate({ ...state, error: null }));

      this.zone.run(() => {
        this.errors.push(error);

        setTimeout(() => {
          error.display = 'none';
        }, 4000)
      });
    });
  }
}
