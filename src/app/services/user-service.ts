import { inject, Injectable } from '@angular/core';
import { User } from 'interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageService = inject(LocalStorage)
  private userSubject = new BehaviorSubject<User | null>(null)
  user$ = this.userSubject.asObservable()

  setUser(user: User) {
    this.userSubject.next(user)
  }

  clearUser() {
    this.userSubject.next(null)
  }

  setSession(user: User):void {
    this.localStorageService.save('session/', user)
  }

  getUserFromSession(): void {
    const user = this.localStorageService.get('session/')
    if (!user) return
    this.userSubject.next(user)
  }
}
