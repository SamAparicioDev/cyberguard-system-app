import { Routes } from '@angular/router';
import { adminGuard } from '../presentation/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/autenticacion',
    pathMatch: 'full'
  },
  {
    path: 'autenticacion',
    loadComponent: () => import('../presentation/components/autenticacion/autenticacion.component')
      .then(m => m.AutenticacionComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../presentation/components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: '/autenticacion'
  }
];
