import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a message whan toast() is called', (done: DoneFn)=>{
    service.notification$.subscribe(msg=>{
      expect(msg).toBe('Test message')
      done()
    })
    service.toast('Test message')
  })

});
