import { Component, inject, OnInit } from '@angular/core';
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

  data!:Card[];
  ctrlData!:Card[]

  ngOnInit(): void {
    this.data = this.fakeData.fakeData
    this.ctrlData = this.fakeData.fakeData

    this.searchValue.search$.subscribe(search => {
      console.log('search received ', search)
      if(!search) return
      this.handleSearch(search)
    })
  }

  handleSearch(search:string){
    const data = this.ctrlData.filter((post)=>{
      return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      post.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      post.authorName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
    this.data = [...data]
  }
}
