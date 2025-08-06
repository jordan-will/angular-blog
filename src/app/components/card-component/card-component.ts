import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [CommonModule],
  templateUrl: './card-component.html',
  styleUrl: './card-component.scss'
})
export class CardComponent {
  cover = input<string>('/images/land.jpg')
  authorAvatar = input<string>('/images/face.jpg')
}
