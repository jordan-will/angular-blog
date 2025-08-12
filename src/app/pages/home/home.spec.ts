import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { By } from '@angular/platform-browser'
import { provideZonelessChangeDetection } from '@angular/core';
import { Post } from 'interfaces/post';
import { of } from 'rxjs';
import { PostsService } from '@services/posts-service';
import { SearchService } from '@services/search-service';

const mockData: Post[] = [
  {
    id: '1',
    title: 'Post 1',
    description: 'Desc 1',
    content: 'Content 1',
    authorId: '101',
    authorName: 'Author',
    authorAvatar: '',
    cover: ''
  },
  {
    id: '1',
    title: 'Angular NGRX',
    description: 'State management with NGRX',
    content: 'Content 1',
    authorId: '101',
    authorName: 'Jordan Willian',
    authorAvatar: '',
    cover: ''
  },
]

const mockPostService = {
  getPosts: () => of(mockData)
}

const mockSearchService = {
  search$: of('angular')
}

describe('Home', () => {

  let component: Home;
  let fixture: ComponentFixture<Home>;
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: PostsService, useValue: mockPostService },
        { provide: SearchService, useValue: mockSearchService },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTrue();
  });

  it('should render the cards when data is not empty', () => {
    component.data.set(mockData)

    fixture.detectChanges()

    const cards = element.queryAll(By.css('.posts__cards'))
    expect(cards.length).toBeGreaterThan(0)

    const title = cards[0].query(By.css('[card-title]')).nativeElement.textContent

    expect(title).toBe('Post 1')

  })

  it('should show the message when the data is empty', () => {
    component.data.set([])
    fixture.detectChanges()

    const msg = element.query(By.css('.posts__msg'))
    expect(msg.nativeElement.textContent).toContain('No data found for your research')
  })

  it('should call handlePost when card is clicked', () => {
    spyOn(component, 'handlePost')
    component.data.set(mockData)
    fixture.detectChanges()

    const card = element.query(By.css('.posts__cards'))
    card.triggerEventHandler('click', null)

    expect(component.handlePost).toHaveBeenCalledWith('1')

  })

  it('should filter data correctly on handleSearch', () => {
    component.ctrlData.set(mockData);
    component.handleSearch('angular')
    fixture.detectChanges()

    const cards = element.queryAll(By.css('.posts__cards'))
    expect(cards.length).toBe(1)

    const title = cards[0].query(By.css('[card-title]')).nativeElement.textContent
    expect(title).toContain('Angular NGRX')
  })

  it('should render the posts received from PostsService', () => {
    const cards = fixture.debugElement.queryAll(By.css('.posts__cards'));
    expect(cards.length).toBe(1);

    const title = cards[0].query(By.css('[card-title]')).nativeElement.textContent;
    expect(title).toContain('Angular NGRX');
  });

  it('deve filtrar os posts com base no valor do SearchService', () => {
    const cards = fixture.debugElement.queryAll(By.css('.posts__cards'));
    expect(cards.length).toBe(1); // só o post com "angular" no título
  });


});
