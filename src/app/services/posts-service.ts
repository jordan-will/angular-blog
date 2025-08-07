import { inject, Injectable } from '@angular/core';
import { Post } from 'interfaces/post';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private storageService = inject(LocalStorage) 
  
  get posts():Post[]
  {
    return this.storageService.get('posts/') || []
  }

  savePost(post:Post)
  {
    const postsList:Post[] = this.posts || []
    console.log('posts arrays on save ', postsList)
    postsList.unshift(post)
    this.storageService.save('posts/', postsList)
  }

  getPostById(id:string):Post | null
  {
    const post = this.posts.find(post => post.id == id)
    return post || null
  }
}
