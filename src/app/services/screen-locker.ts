import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class ScreenLocker {
  private _state: BehaviorSubject<any> = new BehaviorSubject({ locked: false, msg: '' });

  get state$() {
    return this._state.asObservable();
  }

  lock(msg) {
    this._state.next({ locked: true, msg });
  }

  unlock() {
    this._state.next({ locked: false });
  }
}
