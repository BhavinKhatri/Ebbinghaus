import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => NxWelcomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'memory',
    loadChildren: () =>
      import('./memory/memory.module').then((m) => m.MemoryModule),
  },
];
