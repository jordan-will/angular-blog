import { inject, Injectable } from '@angular/core';
import { Post } from 'interfaces/post';
import { LocalStorage } from './local-storage';
import { FakeData } from './fake-data';
import { map, Observable, of, from, find } from 'rxjs';
import { UserService } from './user-service';
import { User } from 'interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private storageService = inject(LocalStorage)
  private fakeData = inject(FakeData)
  private userService = inject(UserService)

  private get posts() {
    const posts: Post[] = this.fakeData.fakeData;
    const savedPosts: Post[] = this.storageService.get('posts/') || [];
    return [...savedPosts, ...posts];
  }

  getPosts(): Observable<Post[]> {
    const listPost = this.posts
    return of(listPost).pipe(
      map((posts: Post[]) => {
        return posts.map((post: Post) => {
          const author: User = this.userService.fakeUsers.find(a => a.id === post.authorId)!;
          post.authorName = author.name;
          post.authorAvatar = author.profileImage;
          return post;
        });
      })
    );
  }

  savePost(post: Post): void {
    const postsList: Post[] = this.storageService.get('posts/') || []
    postsList.unshift(post)
    this.storageService.save('posts/', postsList)
  }

  getPostById(id: string): Observable<Post | undefined> {
    const listPost = this.posts
    return from(listPost).pipe(
      find(post => post.id === id)
    )
  }

  getPostByAuthor(authorId: string) {
    const listPost = this.posts
    return of(listPost).pipe(
      map(posts => posts.filter(post => post.authorId === authorId))
    )
  }

  updatePostById(idPost: string, data: Post): boolean {
    const postList = this.storageService.get('posts/') || []
    console.log(postList)
    if (postList.length == 0) return false
    const post = postList.find((p: Post) => p.id === idPost)
    console.log(post)
    if (post === -1) return false
    const postUpdated = { post, ...data }
    this.savePost(postUpdated)
    return true
  }

  deletePostById(postId: string) {
    try {
      const postList = this.storageService.get('posts/') || []
      const postDeletedList = postList.filter((p: Post) => p.id !== postId)
      this.storageService.save('posts/', postDeletedList)
      return true
    } catch (error) {
      console.log('error delete post', error)
      return false
    }
  }
}
