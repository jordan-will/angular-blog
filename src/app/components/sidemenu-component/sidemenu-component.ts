import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user-service';
import { User } from 'interfaces/user';

type MenuConfig = { url: string, label: string, icon: string }

@Component({
  selector: 'app-sidemenu-component',
  imports: [CommonModule],
  templateUrl: './sidemenu-component.html',
  styleUrl: './sidemenu-component.scss'
})
export class SidemenuComponent implements OnInit {

  private router = inject(Router)
  private userService = inject(UserService)
  clickedEvent = output<void>()

  user!: User| null;

  navLinks: MenuConfig[] = [
    {
      label: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      label: 'Write',
      url: '/editor',
      icon: 'edit'
    },
    {
      label: 'Stories',
      url: '',
      icon: 'book'
    },
  ]
  sessionLinks = signal<MenuConfig[]>([])

  isOpenLeft = input<boolean>(false)
  isOpenRight = input<boolean>(false)
  typeMenu = input<'left' | 'right'>('right')

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user || null 
      this.handleSessionMenu()
    })
  }

  handleRouter(url: string) {
    if (url === 'sign_out') {
      this.userService.logOut()
      // this.handleSessionMenu()
    }
    this.router.navigate([url])
    this.clickedEvent.emit()
  }

  handleSessionMenu(): void {
    console.log('USER33 ', this.user)
    if (this.user) {
      this.sessionLinks.set(
        [
          {
            label: 'Settings',
            url: '/settings',
            icon: 'settings'
          },
          {
            label: 'Logout',
            url: 'sign_out',
            icon: 'logout'
          }
        ])
    } else {
      this.sessionLinks.set(
        [
          {
            label: 'Login',
            url: '/sign-in',
            icon: 'login'
          },
          {
            label: 'Settings',
            url: '/settings',
            icon: 'settings'
          }
        ]
      )
    }  
  }

}
