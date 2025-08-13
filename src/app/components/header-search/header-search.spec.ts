import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearch } from './header-search';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HeaderSearch', () => {
  let component: HeaderSearch;
  let fixture: ComponentFixture<HeaderSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSearch],
      providers: [
        provideZonelessChangeDetection()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
