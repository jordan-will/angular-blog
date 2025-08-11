import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorMsg } from '@components/form-error-msg/form-error-msg';
import { LocalStorage } from '@services/local-storage';
import { NotificationService } from '@services/notification-service';
import { UserService } from '@services/user-service';
import { User } from 'interfaces/user';

@Component({
  selector: 'app-sign-in-page',
  imports: [ReactiveFormsModule, FormErrorMsg],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
  standalone: true
})
export class SignInPage implements OnInit {

  public router = inject(Router)
  private localStorage = inject(LocalStorage)
  private userService = inject(UserService)
  private notificationService = inject(NotificationService)

  formBuilder = inject(FormBuilder)
  form!: FormGroup
  formIcon: "visibility" | "visibility_off" = "visibility"
  typeInput: "text" | "password" = "password"
  disabledButton: boolean = false

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

  toggleIcon() {
    this.formIcon = this.formIcon === "visibility" ? "visibility_off" : "visibility"
    this.typeInput = this.typeInput === "text" ? "password" : "text"
  }

  login() {
    this.disabledButton = true
    const hasUser = this.getUser(this.email?.value, this.password?.value)
    if (!hasUser) {
      this.notificationService.toast('Invalid email or password')
      this.disabledButton = false
      return
    }

    this.userService.setUser(hasUser as User)
    this.userService.setSession(hasUser as User)

    this.disabledButton = false
    this.form.reset()
    this.notificationService.toast(`Logged as ${hasUser.email}`)

    this.router.navigate(['/home'])

  }

  getUser(email: string, password: string): null | User {
    const user = this.localStorage.get('users/') || []
    const fakeUsers = this.userService.fakeUsers
    const listUser = [...fakeUsers, ...user]
    const userData = listUser.find((u: User) => u.email === email && u.password === password)
    if (userData === -1) return null
    return userData as User
  }
}
