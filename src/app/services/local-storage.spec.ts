import { TestBed } from '@angular/core/testing';

import { LocalStorage } from './local-storage';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LocalStorage', () => {

  let service: LocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorage,
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(LocalStorage);
  });

  afterEach(()=>{
    localStorage.clear()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get initial empty data from LocalStorage service', () => {
    spyOn(service, 'get').and.returnValue([])
    const data = service.get('users/')
    expect(data).toEqual([])
  })

  it('should save data on LocalStorage service', () => {
    const mockData = {
      name: 'Carlos',
      email: 'carlos@email.com',
      password: '123456'
    }
    const key = 'users/';
    service.save(key, mockData);

    const data = service.get(key);
    expect(data).toEqual(mockData);
  })

});
