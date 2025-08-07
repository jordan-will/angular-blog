import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sidemenu-component',
  imports: [CommonModule],
  templateUrl: './sidemenu-component.html',
  styleUrl: './sidemenu-component.scss'
})
export class SidemenuComponent {
  isOpenLeft = input<boolean>(false)
  isOpenRight = input<boolean>(false)
  typeMenu = input<'left'|'right'>('right')
}
