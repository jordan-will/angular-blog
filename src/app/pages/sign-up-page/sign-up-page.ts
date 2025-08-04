import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Avatar } from '@components/avatar/avatar';
import { FormErrorMsg } from '@components/form-error-msg/form-error-msg';
import { LocalStorage } from '@services/local-storage';
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

  formBuilder = inject(FormBuilder)
  storage = inject(LocalStorage)
  private router = inject(Router)

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

  toogleIcon() {
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
    console.log(this.form.value)
    if (this.form.invalid) {
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
      this.storage.save('users/', users)
      this.router.navigate(['/sign-in'])
        .finally(() => {
          this.disabledButton = false
          this.form.reset()
        })
    }
    catch (e) {
      console.log('Error saving user:', e);
      this.disabledButton = true
    }
  }

  updateAvatar(string: string) {
    console.log('Avatar updated with:', string)
    this.url = string
  }

}
