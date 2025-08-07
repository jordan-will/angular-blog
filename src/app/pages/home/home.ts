import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '@components/card-component/card-component';
import { FakeData } from '@services/fake-data';
import { SearchService } from '@services/search-service';
import { Card } from 'interfaces/card';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  private fakeData = inject(FakeData)
  private searchValue = inject(SearchService)

  data = signal<Card[]>([]);
  ctrlData = signal<Card[]>([])

  ngOnInit(): void {
    this.data.set(this.fakeData.fakeData)
    this.ctrlData.set(this.fakeData.fakeData)

    this.searchValue.search$.subscribe(search => {
      console.log('search received ', search)
      if(search) {
        this.handleSearch(search)
        return
      }

      this.data.set(this.ctrlData())
      
    })
  }

  handleSearch(search:string){
    const data = this.ctrlData().filter((post)=>{
      return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      post.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      post.authorName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
    console.log('data ', data)
    this.data.set(data)
  }
}
