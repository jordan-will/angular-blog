import { AfterViewInit, Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { SearchService } from '@services/search-service';
import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'

@Component({
  selector: 'app-header-search',
  imports: [
    // FormsModule
  ],
  templateUrl: './header-search.html',
  styleUrl: './header-search.scss'
})
export class HeaderSearch implements AfterViewInit {
  private searchService = inject(SearchService)
  searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput')
  // searchValue: string = ''

  ngAfterViewInit(): void {
    fromEvent(this.searchInput().nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(300)
      )
      .subscribe((search) => this.searchService.handleSearch(search));
  }
}
