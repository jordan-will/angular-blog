import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearch } from './header-search';

describe('HeaderSearch', () => {
  let component: HeaderSearch;
  let fixture: ComponentFixture<HeaderSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSearch]
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
