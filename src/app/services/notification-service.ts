import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private notificationSubject = new Subject<string|null>()
    notification$ = this.notificationSubject.asObservable()

    toast(msg:string|null){
      this.notificationSubject.next(msg)
    }
}
