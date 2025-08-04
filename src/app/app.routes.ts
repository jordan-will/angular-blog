import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
export const routes: Routes = [
  {
    path:'',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up-page/sign-up-page').then(m => m.SignUpPage)
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in-page/sign-in-page').then(m => m.SignInPage)
  }
];
