import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-form-error',
  imports: [],
  templateUrl: './form-error-msg.html',
  styleUrl: './form-error-msg.scss',
  standalone: true
})
export class FormErrorMsg {
  control = input<AbstractControl|null>(null)
}
