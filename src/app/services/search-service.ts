import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string | null>('')
  search$ = this.searchSubject.asObservable()

  handleSearch(search: string | null) {
    this.searchSubject.next(search)
  }

}
