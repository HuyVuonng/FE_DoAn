import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdminComponent } from './admin.component';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('../../features/admin/posts/post.routing.module').then(
            (m) => m.PostRoutingModule,
          ),
        // title: 'Unit',
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('../../features/admin/accounts/account.routing.module').then(
            (m) => m.AccountRoutingModule,
          ),
        // title: 'Unit',
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../../features/admin/reports/report.routing.module').then(
            (m) => m.ReportRoutingModule,
          ),
        // title: 'Unit',
      },
      {
        path: 'config',
        loadComponent: () =>
          import('../../features/admin/config/config.component').then(
            (m) => m.ConfigComponent,
          ),
        // title: 'Unit',
      },
      {
        path: '**',
        redirectTo: '/',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
