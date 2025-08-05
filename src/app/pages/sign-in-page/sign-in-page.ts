import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  Router, 
  RouterLink, 
  RouterModule 
} from '@angular/router';
import { FormErrorMsg } from '@components/form-error-msg/form-error-msg';
import { LocalStorage } from '@services/local-storage';
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
  private userServicce = inject(UserService)

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
    console.log('has user', hasUser)
    if (!hasUser) {
      this.disabledButton = false
      return
    }
    console.log('user on login ', hasUser)
    
    this.userServicce.setUser(hasUser as User)
    this.userServicce.setSession(hasUser as User)

    this.router.navigate(['/home'])
      .then(() => {
        this.disabledButton = false
        this.form.reset()
      })

  }

  getUser(email: string, password: string): boolean | User {
    const user = this.localStorage.get('users/')
    console.log('user 2', user)
    if (!user) return false
    const userData = user.find((u: any) => u.email === email && u.password === password)
    if (userData === -1) return false
    return userData as User
  }
}
