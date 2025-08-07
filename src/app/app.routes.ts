import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
import { authGuard } from 'guards/auth-guard';
import { exitGuard } from 'guards/exit-guard';
export const routes: Routes = [
  {
    path:'',
    redirectTo: '/editor',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'editor',
    loadComponent: () => import('./pages/editor/editor').then(m => m.Editor),
    canActivate: [authGuard],
    canDeactivate: [exitGuard]
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
