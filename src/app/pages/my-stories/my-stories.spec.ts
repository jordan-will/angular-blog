import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStories } from './my-stories';
import { provideZonelessChangeDetection } from '@angular/core';
import { UserService } from '@services/user-service';
import { PostsService } from '@services/posts-service';
import { Router } from '@angular/router';
import { User } from 'interfaces/user';
import { Post } from 'interfaces/post';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser'

const mockUser: User = {
  id: 'user123',
  name: 'Carlos',
  email: 'carlos@email.com'
} as User

const mockPosts: Post[] = [
  {
    id: 'post1',
    title: 'Post 1',
    description: 'Desc 1',
    content: 'Content 1',
    authorId: 'user123',
    cover: 'cover1.jpg'
  },
  {
    id: 'post2',
    title: 'Post 2',
    description: 'Desc 2',
    content: 'Content 2',
    authorId: 'user123',
    cover: 'cover2.jpg'
  },
]

describe('MyStories', () => {
  let component: MyStories;
  let fixture: ComponentFixture<MyStories>;

  let mockUserService: jasmine.SpyObj<UserService>
  let mockPostService: jasmine.SpyObj<PostsService>
  let mockRouter: jasmine.SpyObj<Router>

  beforeEach(async () => {

    mockUserService = jasmine.createSpyObj('UserService', ['getUserOnSession'])
    mockPostService = jasmine.createSpyObj('PostService', ['getPostByAuthor'])
    mockRouter = jasmine.createSpyObj('Router', ['navigate'])

    await TestBed.configureTestingModule({
      imports: [MyStories],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: PostsService, useValue: mockPostService },
        { provide: Router, useValue: mockRouter },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyStories);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    mockUserService.getUserOnSession.and.returnValue(mockUser)
    mockPostService.getPostByAuthor.and.returnValue(of(mockPosts))

    component.ngOnInit()

    expect(component.userLogged).toEqual(mockUser)
    expect(component.postList()).toEqual(mockPosts)
    expect(mockPostService.getPostByAuthor).toHaveBeenCalledWith('user123')
  })

  it('should navigate to editor with correct params', () => {
    component.userLogged = mockUser
    component.callEdit('post1')
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/editor', 'post1', 'user123'])
  })

  it('should render post time when postList is not empty', ()=>{
    mockUserService.getUserOnSession.and.returnValue(mockUser)
    mockPostService.getPostByAuthor.and.returnValue(of(mockPosts))

    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(
      By.css('.stories__item')
    )
    expect(items.length).toBe(2)

    const titles = items.map(el => el.nativeElement.querySelector('.stories__title').textContent.trim())
    expect(titles).toEqual(['Post 1', 'Post 2'])

  })

  it('should show empty message when postList is empty', () => {
    mockUserService.getUserOnSession.and.returnValue(mockUser)
    mockPostService.getPostByAuthor.and.returnValue(of([]))

    fixture.detectChanges()

    const message = fixture.debugElement.query(
      By.css('span')
    ).nativeElement.textContent.trim()
    expect(message).toBe("You don't have any post yet. Create your first post")
  })

});
