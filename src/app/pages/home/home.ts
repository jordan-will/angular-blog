import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '@components/card-component/card-component';
import { FakeData } from '@services/fake-data';
import { PostsService } from '@services/posts-service';
import { SearchService } from '@services/search-service';
import { Card } from 'interfaces/card';
import { Post } from 'interfaces/post';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  
  private router = inject(Router)
  private postService = inject(PostsService)
  private searchValue = inject(SearchService)

  data = signal<Post[]>([]);
  ctrlData = signal<Post[]>([])

  ngOnInit(): void {
    // this.data.set(this.postService.posts)
    // this.ctrlData.set(this.postService.posts)

    this.postService.getPosts()
    .subscribe((posts)=>{
      this.data.set(posts)
      this.ctrlData.set(posts)
    })

    this.searchValue.search$.subscribe(search => {
      if (search) {
        this.handleSearch(search)
        return
      }
      this.data.set(this.ctrlData())
    })
  }

  handleSearch(search: string) {
    const data = this.ctrlData().filter((post) => {
      return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        post.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
    this.data.set(data)
  }

  handlePost(id: string) {
    this.router.navigate(['/post', id ])
  }
}
