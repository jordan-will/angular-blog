import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { HeaderSearch } from '@components/header-search/header-search';
import { SearchService } from '@services/search-service';
import { UserService } from '@services/user-service';
import { User } from 'interfaces/user';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-component',
  imports: [
    CommonModule,
    HeaderSearch,
    RouterLink
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router)
  private userService = inject(UserService)
  private searchService = inject(SearchService)

  user!: User | null;
  showSearchForm: boolean = false
  isLogged: boolean = false
  sideMenu = output<'left' | 'right'>()
  public showSearchBtn:boolean = false

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isLogged = user !== null ? true : false
      this.user = user
    })

    this.listenShowSearch()
  }

  toggleMenu(type: 'left' | 'right') {
    this.sideMenu.emit(type)
  }

  toogleSearch()
  {
    this.showSearchForm = !this.showSearchForm
    if(!this.showSearchForm) this.searchService.handleSearch(null)
  }

  listenShowSearch(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      const showRoutes = ['/home', '/my-stories']
      this.showSearchBtn = showRoutes.some(route => event.urlAfterRedirects.startsWith(route))
    })
  }

}
