import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'my-cars',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cars/my-cars/my-cars.component').then((m) => m.MyCarsComponent)
  },
  {
    path: 'cars/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cars/car-detail/car-detail.component').then((m) => m.CarDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
