import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { User } from 'interfaces/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
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
});
