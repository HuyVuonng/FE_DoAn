import { AuthGuard } from './core/guards/auth.guard';
import { AuthAdminGuard } from './core/guards/authAdmin.guard';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routing.module').then(
        (m) => m.AdminRoutingModule,
      ),
    // canActivate: [AuthAdminGuard],
  },
  {
    path: 'activeAccount/:id',
    loadComponent: () =>
      import('./features/active-email/active-email.component').then(
        (m) => m.ActiveEmailComponent,
      ),
    // canActivate: [AuthAdminGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/main/main.routing.module').then(
        (m) => m.MainRoutingModule,
      ),
    // canActivate: [AuthGuard],
  },
];
