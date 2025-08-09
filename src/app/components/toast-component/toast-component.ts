import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.scss'
})
export class ToastComponent {
  message = input<string>()
}
