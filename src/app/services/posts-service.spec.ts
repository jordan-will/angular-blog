import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { Post } from 'interfaces/post';
import { User } from 'interfaces/user';
import { LocalStorage } from './local-storage';
import { FakeData } from './fake-data';
import { UserService } from './user-service';

const mockPosts: Post[] = [
  {
    id: '1', title: 'Post 1', content: 'Content 1', authorId: '101', description: 'Desc 1'
  },
  {
    id: '2', title: 'Post 2', content: 'Content 2', authorId: '102', description: 'Desc 2'
  },
]

const mockUsers: User[] = [
  {
    id: '101', name: 'Mary', profileImage: 'mary.jpg', email: 'mary@email.com', password: '123456',
  },
  {
    id: '102', name: 'Jonh', profileImage: 'jonh.jpg', email: 'jonh@email.com', password: '123456',
  }
]

class MockLocalStorage {
  private store: Record<string, any> = {}

  get<T>(key: string): T | null {
    return this.store[key] || null
  }

  save<T>(key: string, value: T): void {
    this.store[key] = value
  }
}

class MockFakeData { fakeData = mockPosts }

class MockUserService { fakeUsers = mockUsers }

describe('PostsService', () => {
  let service: PostsService;
  let storage: MockLocalStorage

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        {
          provide: LocalStorage, useClass: MockLocalStorage
        },
        {
          provide: FakeData, useClass: MockFakeData
        },
        {
          provide: UserService, useClass: MockUserService
        },
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(PostsService);
    storage = TestBed.inject(LocalStorage) as unknown as MockLocalStorage
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return post with author info', (done: DoneFn) => {
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2)
      expect(posts[0].authorName).toBe('Mary')
      expect(posts[0].authorAvatar).toBe('mary.jpg')
      done()
    })
  })

  it('should save a new post to local storage', () => {
    const newPost:Post = {
      id: '3',
      title: 'Post 3',
      content: 'Content 3',
      authorId: '101',
      description: 'Desc 3'
    } 
    service.savePost(newPost)

    const saved = storage.get<Post[]>('posts/')
    expect(saved?.[0]).toEqual(newPost)
  })

  it('should return the correct post by ID', (done: DoneFn) => {
    service.getPostById('1').subscribe(post => {
      expect(post?.title).toBe('Post 1')
      done()
    })
  })

  it('should return undefined if the post not found', (done: DoneFn)=>{
    service.getPostById('999')
    .subscribe(post => {
      expect(post).toBeUndefined()
      done()
    })
  })

});
