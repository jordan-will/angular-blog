import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpPage } from './sign-up-page';
import { provideZonelessChangeDetection } from '@angular/core';
import { LocalStorage } from '@services/local-storage';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification-service';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  const localStorageSpy = jasmine.createSpyObj('LocalStorage', ['save', 'get'])
  localStorageSpy.get.and.returnValue([]);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate'])
  let notificationService: NotificationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpPage],
      providers: [
        NotificationService,
        {
          provide: LocalStorage,
          useValue: localStorageSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
    notificationService = TestBed.inject(NotificationService)
    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sign up page', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with rigth fields', () => {
    // fixture.detectChanges();
    expect(component.form.contains('name')).toBeTrue()
    expect(component.form.contains('email')).toBeTrue()
    expect(component.form.contains('password')).toBeTrue()
  })

  it('should validate fields of the form', () => {
    // fixture.detectChanges();
    component.form.get('name')?.setValue('ab')
    expect(component.form.get('name')?.valid).toBeFalse()

    component.form.get('email')?.setValue('abc')
    expect(component.form.get('email')?.valid).toBeFalse()

    component.form.get('password')?.setValue('123')
    expect(component.form.get('password')?.valid).toBeFalse()

    component.form.get('name')?.setValue('Carlos')
    component.form.get('email')?.setValue('carlos@email.com')
    component.form.get('password')?.setValue('123456')

    expect(component.form.valid).toBeTrue()

  })

  it('should disabled the button if the form is invalid or disabled button is true', () => {
    component.form.patchValue({
      name: '',
      email: '',
      password: ''
    })
    component.disabledButton = false;
    expect(component.form.invalid).toBeTrue()
    expect(component.disabledButton).toBeFalse()

    component.form.patchValue({
      name: 'Carlos',
      email: 'carlos@email.com',
      password: '123456'
    })

    component.disabledButton = true;
    expect(component.form.valid).toBeTrue()
    expect(component.disabledButton).toBeTrue()

    const isStillDisabled = component.form.invalid || component.disabledButton
    expect(isStillDisabled).toBeTrue()

    //valid form and button enabled
    component.disabledButton = false
    const isEnable = component.form.valid && !component.disabledButton
    expect(isEnable).toBeTrue()

  })

  it('should save and navigate when form is valid', () => {

    const testUser = {
      name: 'Carlos',
      email: 'carlos@email.com',
      password: '123456'
    }
    component.form.setValue({
      email: 'carlos@email.com',
      name: 'Carlos',
      password: '123456'
    })
    component.url = 'avatar.png'

    expect(component.form.valid).toBeTrue()

    localStorageSpy.get.and.returnValue([])
    routerSpy.navigate.and.returnValue(Promise.resolve(true))

    component.createUser()

    expect(localStorageSpy.save).toHaveBeenCalled()
    const savedUsers = localStorageSpy.save.calls.mostRecent().args[1]
    expect(savedUsers.length).toBe(1)

    expect(savedUsers[0].name).toBe('Carlos');
    expect(savedUsers[0].email).toBe('carlos@email.com');
    expect(savedUsers[0].profileImage).toBe('avatar.png');

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])

  })

  it('shoud emit notification if the form is invalid', (done: DoneFn)=>{
    component.form.patchValue({
      email: '',
      password: ''
    })

    expect(component.form.invalid).toBeTrue()
    
    notificationService.notification$.subscribe(msg => {
      expect(msg).toBe('Fill out the form correctly')
      done()
    })

    component.createUser()
  })

  it('should handle error when createUser fails', (done: DoneFn)=>{
    component.form.patchValue({
      name:'Carlos',
      email: 'carlos@email.com',
      password: '123456'
    })
    component.url = 'avatar.jpg'

    localStorageSpy.get.and.returnValue([])
    localStorageSpy.save.and.throwError('Error trigged')

    notificationService.notification$.subscribe(msg=>{
      expect(msg).toBe('Error on create user. Try again.')
      done()
    })

    component.createUser()

    expect(component.disabledButton).toBeFalse()    

  })

});
