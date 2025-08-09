import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeData } from '@services/fake-data';
import { PostsService } from '@services/posts-service';
import { Post as P } from 'interfaces/post';
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

  post!: P;
  content: unknown;

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id')!
    this.postService.getPostById(postId)
    .subscribe((post)=>{
      if(post)
      {
        this.post = post
        this.content = post.content
      }
    })
  }
}
