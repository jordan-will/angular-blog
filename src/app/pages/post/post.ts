import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '@services/posts-service';
import { UserService } from '@services/user-service';
import { Post as PostData } from 'interfaces/post';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-post',
  imports: [
    CommonModule,
    QuillModule
  ],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class Post implements OnInit {

  private route = inject(ActivatedRoute)
  private postService = inject(PostsService)
  private userService = inject(UserService)

  post!: PostData;
  content: unknown;

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id')!
    this.postService.getPostById(postId)
    .subscribe((post)=>{
        this.post = post!
        this.content = post!.content
        const author = this.getAuthor(post?.authorId!)
        this.post.authorAvatar = author?.profileImage || 'images/user.png'
        this.post.authorName = author?.name || 'Unknow Author'
    })
  }

  getAuthor(auhtorId:string)
  {
    return this.userService.users.find(u => u.id === auhtorId)
  }

}
