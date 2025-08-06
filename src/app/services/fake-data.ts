import { Injectable } from '@angular/core';
import { Card } from 'interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class FakeData {

  private testCards: Card[] = [
    {
      title: 'Exploring Angular 20',
      description: 'Discover the latest features and improvements in Angular\'s newest release.',
      authorName: 'Camila Duarte',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Responsive Design with SCSS',
      description: 'Learn how to build adaptive layouts using modern SCSS techniques.',
      authorName: 'Lucas Almeida',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Boosting Performance with @for',
      description: 'See how the @for directive can enhance rendering of large lists.',
      authorName: 'Marina Costa',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Reusable Components',
      description: 'Best practices for building modular and reusable Angular components.',
      authorName: 'João Pedro',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Integrating with REST APIs',
      description: 'How to consume external APIs efficiently and securely.',
      authorName: 'Ana Beatriz',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Unit Testing with Jasmine',
      description: 'Ensure code quality with automated unit tests.',
      authorName: 'Rafael Lima',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Angular Material in Practice',
      description: 'Use ready-made components to speed up development.',
      authorName: 'Fernanda Rocha',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Advanced Routing',
      description: 'Master dynamic routing and lazy loading in Angular.',
      authorName: 'Carlos Henrique',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'State Management with Signals',
      description: 'Explore Angular\'s new reactivity system.',
      authorName: 'Juliana Mello',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Deploying with Vite and Angular',
      description: 'Combine Vite\'s speed with Angular\'s structure.',
      authorName: 'Thiago Silva',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Reactive Forms',
      description: 'Build complex forms with dynamic validations.',
      authorName: 'Patrícia Gomes',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Building a Blog with Angular',
      description: 'Complete tutorial to create your own blog using Angular.',
      authorName: 'Eduardo Ramos',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Animations with Angular',
      description: 'Add life to your UI with smooth animations.',
      authorName: 'Isabela Torres',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Internationalization (i18n)',
      description: 'Prepare your app for multiple languages.',
      authorName: 'Rodrigo Cunha',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Dark Mode with SCSS',
      description: 'Implement light and dark themes with ease.',
      authorName: 'Larissa Nunes',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Angular Signals vs RxJS',
      description: 'Compare both reactivity models and choose the best fit.',
      authorName: 'Bruno Ferreira',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Creating Components with ng-content',
      description: 'Use content projection for flexible components.',
      authorName: 'Sofia Martins',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Performance with ChangeDetection',
      description: 'Optimize your app with change detection strategies.',
      authorName: 'Gabriel Souza',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Angular CLI: Tips and Tricks',
      description: 'Master the command line to boost your workflow.',
      authorName: 'Amanda Oliveira',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    },
    {
      title: 'Creating a Landing Page',
      description: 'Build a presentation page with Angular and SCSS.',
      authorName: 'Felipe Andrade',
      authorAvatar: 'images/face.jpg',
      cover: '/images/land.jpg'
    }
  ];

  public get fakeData(): Card[] {
    return this.testCards
  }

}
