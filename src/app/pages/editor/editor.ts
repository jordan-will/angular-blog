import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Avatar } from '@components/avatar/avatar';
import { NotificationService } from '@services/notification-service';
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
export class Editor implements OnInit, OnDestroy, CanComponentDeactivate {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private postService = inject(PostsService)
  private userService = inject(UserService)
  private notificationService = inject(NotificationService)

  title: string = ''
  description: string = ''
  content: string = '';
  cover = signal<string>('')
  hasUnsavedChanges: boolean = true

  idPostEdit = signal<string>('null');
  idAuthorEdit = signal<string>('null');

  ngOnInit() {
    const idAuthorEdit = this.route.snapshot.paramMap.get('idAuthorEdit')!
    const idPostEdit = this.route.snapshot.paramMap.get('idPostEdit')!
    console.log(idAuthorEdit, idPostEdit, typeof idAuthorEdit)

    if (idAuthorEdit != 'null' && idPostEdit != 'null') {
      console.log('post to edit')
      this.idAuthorEdit.set(idAuthorEdit)
      this.idPostEdit.set(idPostEdit)
      this.postService.getPostById(this.idPostEdit())
        .subscribe((post) => {
          if (post) {
            this.title = post.title
            this.content = post.content
            this.description = post.description
            this.cover.set(post.cover!)
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.clearPost()
    this.idAuthorEdit.set('') 
    this.idPostEdit.set('')
  }

  setCover(cover: string) {
    this.cover.set(cover)
  }

  handlePost() {
    console.log(this.idAuthorEdit, this.idPostEdit, typeof this.idAuthorEdit)
    if (this.idAuthorEdit() !== 'null' && this.idPostEdit() !== 'null') {
      this.editPost()
    } else {
      this.savePost()
    }
  }

  savePost() {
    if (
      !this.title ||
      !this.description ||
      !this.content ||
      !this.cover()) {
      this.notificationService.toast('Fields is missing on your post')
      return;
    }

    const user = this.userService.getUserOnSession()

    const post: Post = {
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

  editPost() {
    // const user = this.userService.getUserOnSession()

    const postUpdated: Post = {
      authorId: this.idAuthorEdit(),
      content: this.content,
      description: this.description,
      id: this.idPostEdit(),
      title: this.title,
      cover: this.cover()
    }

    const isUpdated = this.postService.updatePostById(this.idPostEdit(), postUpdated)
    console.log('is up ', isUpdated)

    if (isUpdated) {
      this.notificationService.toast('Post updated succesfully')
      this.clearPost()
      this.router.navigate(['/home'])
      return
    }

    this.notificationService.toast('Post not updated. Try again')
  }

  clearPost() {
    this.content = ''
    this.title = ''
    this.description = ''
    this.cover.set('')
  }

  canDeactivate(): boolean {
    return !this.hasUnsavedChanges || confirm('Do you want leave this page?')
  }

  deletePost()
  {
    this.hasUnsavedChanges = false
    this.postService.deletePostById(this.idPostEdit())
    this.router.navigate(['/home'])
  }

}
