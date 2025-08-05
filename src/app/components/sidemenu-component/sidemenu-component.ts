import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sidemenu-component',
  imports: [CommonModule],
  templateUrl: './sidemenu-component.html',
  styleUrl: './sidemenu-component.scss'
})
export class SidemenuComponent {
  isOpen = input<boolean>(true)
}
