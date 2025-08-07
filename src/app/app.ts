import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer-component/footer-component';
import { HeaderComponent } from '@components/header-component/header-component';
import { SidemenuComponent } from '@components/sidemenu-component/sidemenu-component';
import { UserService } from '@services/user-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    SidemenuComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  userService = inject(UserService)
  
  protected title = 'Angular Blog';
  isMenuOpenLeft = false
  isMenuOpenRight = false

  ngOnInit(): void {
    this.userService.getUserFromSession()
  }

  onToggleMenu(type: 'left'|'right')
  {
    if(type == 'left'){
      this.isMenuOpenLeft = !this.isMenuOpenLeft
      this.isMenuOpenRight = false
    }
    if(type == 'right'){
      this.isMenuOpenRight = !this.isMenuOpenRight
      this.isMenuOpenLeft = false
    }
  }

}
