import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer-component/footer-component';
import { HeaderComponent } from '@components/header-component/header-component';
import { SidemenuComponent } from '@components/sidemenu-component/sidemenu-component';
import { ToastComponent } from '@components/toast-component/toast-component';
import { NotificationService } from '@services/notification-service';
import { UserService } from '@services/user-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidemenuComponent,
    FooterComponent, 
    ToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  userService = inject(UserService)
  notificationService = inject(NotificationService)
  message = signal<string|null>(null);

  protected title = 'Angular Blog';
  isMenuOpenLeft = false
  isMenuOpenRight = false

  ngOnInit(): void {
    this.userService.getUserFromSession()
    this.notificationService.notification$
    .subscribe((msg)=>{
      this.message.set(msg)
      setTimeout(()=>{
        // this.notificationService.toast(null)
        this.message.set(null)
      }, 2000)
    })
  }

  onToggleMenu(type: 'left' | 'right') {
    if (type == 'left') {
      this.isMenuOpenLeft = !this.isMenuOpenLeft
      this.isMenuOpenRight = false
    }
    if (type == 'right') {
      this.isMenuOpenRight = !this.isMenuOpenRight
      this.isMenuOpenLeft = false
    }
  }

  menuClicked() {
    this.isMenuOpenRight = false
    this.isMenuOpenLeft = false
  }

}
