import { Injectable } from '@angular/core';
import { User } from 'interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null)
  user$ = this.userSubject.asObservable()

  setUser(user:User){
    this.userSubject.next(user)
  }

  clearUser(){
    this.userSubject.next(null) 
  }
}
