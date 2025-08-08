import { inject, Injectable } from '@angular/core';
import { User } from 'interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from './local-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private router = inject(Router)
  private localStorageService = inject(LocalStorage)
  private userSubject = new BehaviorSubject<User | null>(null)
  user$ = this.userSubject.asObservable()

  private fakeUsersData:User[] = [
    {
      id: '123456',
      name: 'John Doe',
      email: 'jonhdoe@email.com',
      password: '123456',
      profileImage: 'images/john-doe.jpg'
    },
    {
      id: '654321',
      name: 'Mary Oliver',
      email: 'maryoliver@email.com',
      password: '123456',
      profileImage: 'images/mary-oliver.jpg'
    },
  ]

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

  getUserOnSession():User
  {
    return this.localStorageService.get('session/') as User
  }

  isLogged():boolean{
    return this.userSubject.value !== null
  }

  get fakeUsers():User[]{
    return this.fakeUsersData
  }

  logOut(){
    this.userSubject.next(null)
    this.localStorageService.remove('session/')
    this.router.navigate(['/'])
  }
}
