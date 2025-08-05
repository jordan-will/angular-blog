import { Component, inject, OnInit, output } from '@angular/core';
import { UserService } from '@services/user-service';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit{
  private userService = inject(UserService)
  isLogged:boolean = false
  sideMenu = output<void>()
  showSearchForm:boolean = false

  ngOnInit(): void {
    this.userService.user$.subscribe(user =>{
      this.isLogged = user !== null ? true : false
      console.log(this.isLogged)
    })
  }

  toggleMenu()
  {
    this.sideMenu.emit()
  }

}
