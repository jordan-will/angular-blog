import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '@services/search-service';
import { UserService } from '@services/user-service';

@Component({
  selector: 'app-header-component',
  imports: [FormsModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit{
  private userService = inject(UserService)
  private searchService = inject(SearchService)
  
  isLogged:boolean = false
  sideMenu = output<void>()
  
  showSearchForm:boolean = false
  searchValue:string = ''

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

  onSubmit()
  {
    console.log(this.searchValue)
    if(!this.searchValue) return
    this.searchService.handleSearch(this.searchValue)
  }

}
