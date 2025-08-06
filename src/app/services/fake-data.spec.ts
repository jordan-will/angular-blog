import { TestBed } from '@angular/core/testing';

import { FakeData } from './fake-data';

describe('FakeData', () => {
  let service: FakeData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
