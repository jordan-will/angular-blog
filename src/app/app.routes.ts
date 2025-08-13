import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
import { authGuard } from 'guards/auth-guard';
import { exitGuard } from 'guards/exit-guard';
export const routes: Routes = [
  {
    path:'',
    redirectTo: '/my-stories',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title: 'Blogger'
  },
  {
    path:'my-stories',
    loadComponent: () => import('./pages/my-stories/my-stories').then(m => m.MyStories)
  },
  {
    path: 'post/:id',
    loadComponent: () => import('./pages/post/post').then(m => m.Post),
    title: 'Read'
  },
  {
    path: 'editor',
    redirectTo: '/editor/null/null',
    pathMatch: 'full'
  },
  {
    path: 'editor/:idPostEdit/:idAuthorEdit',
    loadComponent: () => import('./pages/editor/editor').then(m => m.Editor),
    title: 'Editor',
    canActivate: [authGuard],
    canDeactivate: [exitGuard]
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up-page/sign-up-page').then(m => m.SignUpPage),
    title: 'SignUp'
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in-page/sign-in-page').then(m => m.SignInPage),
    title: 'SignIn'
  }
];
