import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMsg } from './form-error-msg';

describe('FormErrorMsg', () => {
  let component: FormErrorMsg;
  let fixture: ComponentFixture<FormErrorMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorMsg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
