import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {take} from 'rxjs/operators'
import {initialState, State} from "../state/state.model";

@Injectable()
export class StoreService {
  private oldState: State = null;
  private state$ = new BehaviorSubject<State>(initialState);

  constructor() {
    this.state$.asObservable().subscribe(state => {
      console.log(`Store change:`, { oldState: this.oldState, currentState: state });
      this.oldState = state;
    });

    (window as any).store$ = this;
  }

  public select(): Observable<State> {
    return this.state$.asObservable();
  }

  public selectOnce(): Observable<State> {
    return this.state$.asObservable().pipe(take(1));
  }

  public mutate(state: State): void {
    this.state$.next(state);
  }
}
