import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStories } from './my-stories';

describe('MyStories', () => {
  let component: MyStories;
  let fixture: ComponentFixture<MyStories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyStories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
