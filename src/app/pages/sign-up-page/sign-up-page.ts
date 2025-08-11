import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Avatar } from '@components/avatar/avatar';
import { FormErrorMsg } from '@components/form-error-msg/form-error-msg';
import { LocalStorage } from '@services/local-storage';
import { NotificationService } from '@services/notification-service';
import { UserService } from '@services/user-service';
import { User } from 'interfaces/user';

@Component({
  selector: 'app-sign-up-page',
  imports: [
    Avatar,
    FormErrorMsg,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.scss'
})
export class SignUpPage implements OnInit {

  private router = inject(Router)
  private useService = inject(UserService)
  private notificationService = inject(NotificationService)

  formBuilder = inject(FormBuilder)
  storage = inject(LocalStorage)

  url: string = ''
  form!: FormGroup
  formIcon: "visibility" | "visibility_off" = "visibility"
  typeInput: "text" | "password" = "password"
  disabledButton: boolean = false

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  toggleIcon() {
    this.formIcon = this.formIcon === "visibility" ? "visibility_off" : "visibility"
    this.typeInput = this.typeInput === "text" ? "password" : "text"
  }

  get name() {
    return this.form.get('name')
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  createUser() {
    if (this.form.invalid) {
      this.notificationService.toast('Fill out the form correctly')
      return
    }
    this.disabledButton = true

    try {
      const user: User = {
        id: Date.now().toString(),
        name: this.name?.value,
        email: this.email?.value,
        profileImage: this.url,
        password: this.password?.value
      }
      const users = this.storage.get('users/') || []
      users.push(user)

      this.useService.setUser(user)
      this.useService.setSession(user)
      this.storage.save('users/', users)

      this.disabledButton = false
      // this.form.reset()
      this.notificationService.toast('Account created successfully')

      this.router.navigate(['/home'])
    }
    catch (e) {
      console.log('Error saving user:', e);
      this.disabledButton = false
      this.notificationService.toast('Error on create user. Try again.')
    }
  }

  updateAvatar(string: string) {
    this.url = string
  }

}
