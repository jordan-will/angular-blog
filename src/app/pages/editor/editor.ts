import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Avatar } from '@components/avatar/avatar';
import { PostsService } from '@services/posts-service';
import { UserService } from '@services/user-service';
import { CanComponentDeactivate } from 'guards/canDeactive';
import { Post } from 'interfaces/post';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  imports: [
    CommonModule,
    QuillModule, 
    FormsModule,
    Avatar
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss'
})
export class Editor implements OnInit, OnDestroy, CanComponentDeactivate{
  
  private postService = inject(PostsService)
  private userService = inject(UserService)
  private router = inject(Router)

  title:string = ''
  description:string = ''
  content:string = '';
  cover = signal<string>('')

  hasUnsavedChanges:boolean = true

  test(){
     this.router.navigate(['/sign-in']) 
  }

  ngOnInit(){}

  ngOnDestroy(): void {
    this.clearPost()
    // this.hasUnsavedChanges = true
  }

  setCover(cover:string){
    this.cover.set(cover)
  }

  savePost(){
    if(
      !this.title ||
      !this.description ||
      !this.content || 
      !this.cover())
      {
        alert('Fields missing')
      }
      
      const user = this.userService.getUserOnSession()
      
      const post:Post = {
        id: Date.now().toString(),
        title: this.title,
        description: this.description,
        content: this.content,
        // authorAvatar: '',
        authorId: user!.id,
        // authorName: user.name,
        cover: this.cover()
      }
      this.postService.savePost(post)
      this.clearPost()
      this.hasUnsavedChanges = false
      this.router.navigate(['/home'])
  }

  clearPost(){
    this.content = ''
    this.title = ''
    this.description = ''
    this.cover.set('')
  }

  canDeactivate():boolean{
    return !this.hasUnsavedChanges || confirm('Do you want leave this page?')
  }

}
