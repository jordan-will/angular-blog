import { Component, inject, OnInit, output } from '@angular/core';
import { HeaderSearch } from '@components/header-search/header-search';
import { UserService } from '@services/user-service';

@Component({
  selector: 'app-header-component',
  imports: [HeaderSearch],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService)

  showSearchForm: boolean = false
  isLogged: boolean = false
  sideMenu = output<'left' | 'right'>()


  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isLogged = user !== null ? true : false
      console.log(this.isLogged)
    })
  }

  toggleMenu(type: 'left' | 'right') {
    this.sideMenu.emit(type)
  }



}
