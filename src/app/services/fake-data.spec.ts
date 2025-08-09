import { TestBed } from '@angular/core/testing';

import { FakeData } from './fake-data';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FakeData', () => {
  let service: FakeData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(FakeData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
