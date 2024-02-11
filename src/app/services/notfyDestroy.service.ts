import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotfyDestroyService {
  private onDestroySubject = new Subject<void>();
constructor() { }
get onDestroy$() {
  return this.onDestroySubject.asObservable();
}  notifyOnDestroy() {
  this.onDestroySubject.next();
}
}
