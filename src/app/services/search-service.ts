import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchSubject = new BehaviorSubject<string>('') 
  search$ = this.searchSubject.asObservable()

  handleSearch(search:string)
  {
    this.searchSubject.next(search)
  }

}
