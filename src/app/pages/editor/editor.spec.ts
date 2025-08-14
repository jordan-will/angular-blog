import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editor } from './editor';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '@services/posts-service';
import { UserService } from '@services/user-service';
import { NotificationService } from '@services/notification-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Avatar } from '@components/avatar/avatar';
import { of } from 'rxjs';

const activatedRouterMock = {
  params: of({ idPostEdit: 'null', idAuthorEdit: 'null' }),
  queryParamns: of({}),
  snapshot: {
    paramMap: {
      get:(key:string) => 'null'
    }
  }
}

describe('Editor', () => {
  let component: Editor
  let fixture: ComponentFixture<Editor>
  let element: any
  let routerSpy: jasmine.SpyObj<Router>
  let postServiceSpy: jasmine.SpyObj<PostsService>
  let userServiceSpy: jasmine.SpyObj<UserService>
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    postServiceSpy = jasmine.createSpyObj('PostService', ['savePost'])
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUserOnSession'])
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['toast'])

    await TestBed.configureTestingModule({
      imports: [Editor, Avatar],
      providers: [
        CommonModule,
        FormsModule,
        QuillModule,
        { provide: Router, useValue: routerSpy },
        {provide: ActivatedRoute, useValue: activatedRouterMock},
        { provide: PostsService, useValue: postServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Editor);
    component = fixture.componentInstance;
    element = fixture.debugElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cover image', () => {
    component.setCover('image.jpg')
    expect(component.cover()).toBe('image.jpg')
  })

  it('should clear post fields', () => {
    component.title = 'Test'
    component.description = 'Desc'
    component.content = 'Content'
    component.cover.set('cover.jpg')

    component.clearPost()

    expect(component.title).toBe('')
    expect(component.description).toBe('')
    expect(component.content).toBe('')
    expect(component.cover()).toBe('')

  })

  it('should show toast if fields are missing on savePost', () => {
    component.savePost()
    expect(notificationServiceSpy.toast).toHaveBeenCalledWith('Fields is missing on your post')
    expect(postServiceSpy.savePost).not.toHaveBeenCalled()
  })

  it('should save post and navigate to home', () => {
    component.title = 'Title'
    component.description = 'Description'
    component.content = 'Content'
    component.cover.set('cover.jpg')

    userServiceSpy.getUserOnSession.and.returnValue({
      id: '123',
      name: 'Jonh',
      email: 'jonh@email.com'
    })

    component.savePost()

    expect(postServiceSpy.savePost).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Title',
        description: 'Description',
        content: 'Content',
        authorId: '123',
        cover: 'cover.jpg'
      })
    )

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])
    expect(component.hasUnsavedChanges).toBeFalse()

  })

  it('should confirm navigation if there are unsaved changes', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.hasUnsavedChanges = true
    expect(component.canDeactivate()).toBeTrue()
  })

  it('should allow navigation if there are no unsaved changes', () => {
    component.hasUnsavedChanges = false
    expect(component.canDeactivate()).toBeTrue()
  })

});
