import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { HeaderSearch } from '@components/header-search/header-search';
import { UserService } from '@services/user-service';
import { User } from 'interfaces/user';

@Component({
  selector: 'app-header-component',
  imports: [
    CommonModule,
    HeaderSearch
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService)

  user!: User | null;
  showSearchForm: boolean = false
  isLogged: boolean = false
  sideMenu = output<'left' | 'right'>()


  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isLogged = user !== null ? true : false
      this.user = user
    })
  }

  toggleMenu(type: 'left' | 'right') {
    this.sideMenu.emit(type)
  }



}
