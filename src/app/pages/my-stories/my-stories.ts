import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '@services/posts-service';
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
  
  userService = inject(UserService)
  postService = inject(PostsService)
  router = inject(Router)

  postList = signal<Post[]>([])
  userLogged!:User;

  ngOnInit(): void {
    this.userLogged = this.userService.getUserOnSession()!
    this.postService.getPostByAuthor(this.userLogged.id)
    .subscribe(posts => {
      console.log('posts ', posts)
      this.postList.set(posts)
    })
  }

  callEdit(postId:string){
    this.router.navigate(['/editor', postId, this.userLogged.id])
  }

}
