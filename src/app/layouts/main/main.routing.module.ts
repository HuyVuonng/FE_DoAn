import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { TranslateModule } from '@ngx-translate/core';
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
