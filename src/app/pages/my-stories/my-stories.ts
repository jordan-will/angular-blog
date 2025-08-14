import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '@services/posts-service';
import { SearchService } from '@services/search-service';
import { UserService } from '@services/user-service';
import { Post } from 'interfaces/post';
import { User } from 'interfaces/user';

@Component({
  selector: 'app-my-stories',
  imports: [CommonModule],
  templateUrl: './my-stories.html',
  styleUrl: './my-stories.scss'
})
export class MyStories implements OnInit{
  
  router = inject(Router)
  userService = inject(UserService)
  postService = inject(PostsService)
  searchService = inject(SearchService)

  postList = signal<Post[]>([])
  postListCtrl = signal<Post[]>([])
  userLogged!:User;
  hasSearch = signal<boolean>(false)

  ngOnInit(): void {
    this.userLogged = this.userService.getUserOnSession()!
    this.postService.getPostByAuthor(this.userLogged.id)
    .subscribe(posts => {
      console.log('posts ', posts)
      this.postList.set(posts)
      this.postListCtrl.set(posts)
    })

    this.searchService.search$.subscribe(search => {
      if(search){
        const filteredPosts = this.postListCtrl().filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
        console.log('filtered posts ', filteredPosts)
        this.postList.set(filteredPosts)
        this.hasSearch.set(true)
      }else{
        this.postList.set(this.postListCtrl())
        this.hasSearch.set(false)
      }
      // else if(search === ''){
      //   this.postList.set(this.postListCtrl())
      // }else{
      //   this.hasSearch.set(false)
      // }
    })

  }

  callEdit(postId:string){
    this.router.navigate(['/editor', postId, this.userLogged.id])
  }

}
