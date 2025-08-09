import { TestBed } from '@angular/core/testing';

import { SearchService } from './search-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { take } from 'rxjs';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty string', (done)=>{
    service.search$.pipe(take(1)).subscribe(value => {
      expect(value).toBe('')
      done()
    })
  })

  it('should update search value', (done)=>{
    const search = 'travel experience'
    service.handleSearch(search)

    service.search$.pipe(take(1))
    .subscribe(value => {
      expect(value).toBe(search)
      done()
    })
  })
});
