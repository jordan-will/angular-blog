import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { SignInPage } from './sign-in-page';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { LocalStorage } from '@services/local-storage';
import { provideLocationMocks } from '@angular/common/testing';
import { User } from 'interfaces/user';
import { UserService } from '@services/user-service';


fdescribe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>

  let routerSpy: jasmine.SpyObj<Router>
  let userServiceSpy: jasmine.SpyObj<UserService>
  let localStorageSpy: jasmine.SpyObj<LocalStorage>

  const mockData: User = {
    id: '123456',
    name: 'Carlos',
    email: 'carlos@email.com',
    profileImage: 'images/carlos.jpg',
    password: '123456'
  }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    userServiceSpy = jasmine.createSpyObj('UserService', ['setUser'])
    localStorageSpy = jasmine.createSpyObj('LocalStorage', ['get'])

    await TestBed.configureTestingModule({
      imports: [
        SignInPage,
        // RouterLink
      ],
      providers: [
        { provide: LocalStorage, useValue: localStorageSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userServiceSpy },
        // provideRouter([]),
        // provideLocationMocks(),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;

    localStorageSpy.get.and.returnValue([mockData])
    routerSpy.navigate.and.returnValue(Promise.resolve(true))

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with right fields', () => {
    expect(component.form.contains('email')).toBeTrue()
    expect(component.form.contains('password')).toBeTrue()
  })

  it('should validate fields of the form', () => {
    component.email?.setValue('ab')
    expect(component.email?.valid).toBeFalse()

    component.password?.setValue('abc')
    expect(component.password?.valid).toBeFalse()

    component.email?.setValue('carlos@email.com')
    expect(component.email?.valid).toBeTrue()

    component.password?.setValue('123456')
    expect(component.password?.valid).toBeTrue()
  })

  it('should disable the button if the form is invalir or disabledButton varriable is true', () => {
    const mockData = {
      email: 'carlos@email.com',
      password: '123456'
    }
    component.form.setValue({
      email: '',
      password: ''
    })
    component.disabledButton = false
    expect(component.form.invalid).toBeTrue()
    expect(component.disabledButton).toBeFalse()

    component.form.setValue(mockData)
    component.disabledButton = true
    expect(component.form.valid).toBeTrue()
    expect(component.disabledButton).toBeTrue()

    const isStillDisabled = component.form.invalid || component.disabledButton
    expect(isStillDisabled).toBeTrue()

    component.disabledButton = false
    const isEnable = component.form.valid && !component.disabledButton
    expect(isEnable).toBeTrue()


  })

  it('should make login when the form is valid', async () => {
  component.form.setValue({
    email: 'carlos@email.com',
    password: '123456'
  });

  await component.login();
  fixture.detectChanges();

  expect(localStorageSpy.get).toHaveBeenCalledWith('users/');
  expect(userServiceSpy.setUser).toHaveBeenCalledWith(mockData);
  expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  expect(component.disabledButton).toBeFalse();
  expect(component.form.value).toEqual({ email: null, password: null });
});


});
