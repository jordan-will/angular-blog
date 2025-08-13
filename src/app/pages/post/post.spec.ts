import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Post } from './post';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostsService } from '@services/posts-service';
import { UserService } from '@services/user-service';
import { By } from '@angular/platform-browser';

const mockPost = {
  id: '1',
  title: 'Building Better Habits',
  description: 'A Guide to Lasting Change',
  cover: 'cover.jpg',
  content: '{"ops":[{"insert":"Habits shape our lives more than we realize."}]}',
  authorId: '123'
};

const mockActivatedRoute = {
  params: of({ id: '1' }),
  snapshot: {
    paramMap: {
      get: (key: string) => '1'
    }
  }
}

const mockUserService = {
  users: [
    { id: '123', name: 'John Doe', profileImage: 'john.png' }
  ]
};

const mockPostsService = {
  getPostById: () => of(mockPost)
};


describe('Post', () => {
  let component: Post;
  let fixture: ComponentFixture<Post>;
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Post],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService
        },
        {
          provide: UserService,
          useValue: mockUserService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Post);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post with name and avatar author', () => {
    const avatar = element.query(By.css('.post__avatar'));
    expect(avatar.styles['background-image']).toContain('john.png')

    const name = element.query(By.css('.post__info span')).nativeElement.textContent;
    expect(name).toContain('John Doe')

  })

  it('should render the cover post', () => {
    const cover = element.query(By.css('.post__cover'))
    expect(cover.styles['background-image']).toContain('cover.jpg')
  })

  it('should render content as  JSON into quill-view', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const quillElement = fixture.debugElement.query(By.css('div[quill-view-element]')).nativeElement;

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(quillElement.innerHTML).toContain('Habits shape our lives more than we realize');
  });


});
