import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { User } from 'interfaces/user';
import { Router } from '@angular/router';
import { LocalStorage } from './local-storage';

fdescribe('UserService', () => {
  
  let service: UserService;
  let routerSpy: jasmine.SpyObj<Router>
  let localStorageSpy: jasmine.SpyObj<LocalStorage>

  const mockUser:User = {
    id: '123456',
    email: 'mary@email.com',
    name: 'Mary Oliver',
    password: '123456',
    profileImage: 'mary.jpg'
  }  

  beforeEach(() => {

    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    localStorageSpy = jasmine.createSpyObj('LocalStorage', ['save', 'get', 'remove'])

    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: Router, useValue: routerSpy
        }, 
        {
          provide: LocalStorage, useValue: localStorageSpy
        },
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit user from BehaviorSubject', (done) => {
    const mockUser: User = {
      id: '123456',
      name: 'Carlos',
      email: 'carlos@email.com',
      profileImage: 'images/carlos.jpg',
      password: '123456'
    }
    service.setUser(mockUser)
    service.user$.subscribe((user) => {
      expect(user).toEqual(mockUser)
      done()
    })
  })

  it('should emit null after cleaning user', (done) => {
    service.clearUser()
    service.user$.subscribe(user => {
      expect(user).toBeNull()
      done()
    })
  })

  it('should save session to localStorage', () => {
    service.setSession(mockUser)
    expect(localStorageSpy.save).toHaveBeenCalledOnceWith('session/', mockUser)
  })

  it('should get user from session and emit it', () => {
    localStorageSpy.get.and.returnValue(mockUser)
    service.getUserFromSession()
    expect(localStorageSpy.get).toHaveBeenCalledOnceWith('session/')
    expect(service.isLogged()).toBeTrue()
  })

  it('should return user from session directly', () => {
    localStorageSpy.get.and.returnValue(mockUser)
    const user = service.getUserOnSession()
    expect(user).toEqual(mockUser)
  })

  it('should return null if no user in session', () => {
    localStorageSpy.get.and.returnValue(null)
    const user = service.getUserOnSession()
    expect(user).toBeNull()
  })

  it('should return true if the user is logged', () => {
    service.setUser(mockUser)
    expect(service.isLogged()).toBeTrue()
  })

  it('should return false if is not logged', () => {
    service.clearUser()
    expect(service.isLogged()).toBeFalse()
  })

  it('should expose fake users', () => {
    expect(service.fakeUsers.length).toBe(2)
    expect(service.fakeUsers[0].name).toBe('John Doe')
  })

  it('should clear user, remove session and navigate on logout', ()=>{
    service.logOut()
    expect(localStorageSpy.remove).toHaveBeenCalledWith('session/')
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/'])
  })
});
