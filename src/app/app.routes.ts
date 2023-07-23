import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () => import('./todo/feature/list/list.component').then(m => m.ListComponent),
  },

  {
    path: 'categories',
    loadComponent: () => import('./categories/feature/list/list.component').then(m => m.ListComponent),
  },

  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
];
