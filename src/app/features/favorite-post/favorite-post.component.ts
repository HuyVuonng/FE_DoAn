import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ItemComponent } from '../../core/components/item/item.component';
import { SharePaginationModule } from '../../shared/components/share-pagination/share-pagination.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-post',
  standalone: true,
  imports: [
    TranslateModule,
    ItemComponent,
    SharePaginationModule,
    CommonModule,
  ],
  templateUrl: './favorite-post.component.html',
  styleUrl: './favorite-post.component.scss',
})
export class FavoritePostComponent {
  total: number = 100;
  pageIndex: number = 1;
  pageSize: number = 30;
  changePage(e: any) {
    console.log(e);
  }
  changePageSize(e: any) {
    console.log(e);
  }
}
