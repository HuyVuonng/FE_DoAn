import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../../core/guards/auth.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../features/home/home.routing.module').then(
            (m) => m.HomeRoutingModule,
          ),
        // title: 'Unit',
      },
      {
        path: 'postNews',
        loadComponent: () =>
          import('../../features/post-news/post-news.component').then(
            (m) => m.PostNewsComponent,
          ),
        canActivate: [AuthGuard],
        // title: 'Unit',
      },
      {
        path: 'editNews/:id',
        loadComponent: () =>
          import('../../features/post-news/post-news.component').then(
            (m) => m.PostNewsComponent,
          ),
        // title: 'Unit',
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('../../features/detail-hostel/detail-hostel.component').then(
            (m) => m.DetailHostelComponent,
          ),
        // title: 'Unit',
      },
      {
        path: 'detail/manager/:id',
        loadComponent: () =>
          import('../../features/detail-hostel/detail-hostel.component').then(
            (m) => m.DetailHostelComponent,
          ),
        // title: 'Unit',
      },
      {
        path: 'userInfor/:id',
        loadComponent: () =>
          import('../../features/user-infor/user-infor.component').then(
            (m) => m.UserInforComponent,
          ),
        // title: 'Unit',
      },
      {
        path: 'managerPost/:id',
        loadComponent: () =>
          import('../../features/manager-post/manager-post.component').then(
            (m) => m.ManagerPostComponent,
          ),
        // title: 'Unit',
      },
      {
        path: 'paymentStatus',
        loadComponent: () =>
          import('../../features/payment-status/payment-status.component').then(
            (m) => m.PaymentStatusComponent,
          ),
        // title: 'Unit',
      },
      {
        path: 'favoritePost/:id',
        loadComponent: () =>
          import('../../features/favorite-post/favorite-post.component').then(
            (m) => m.FavoritePostComponent,
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
export class MainRoutingModule {}
