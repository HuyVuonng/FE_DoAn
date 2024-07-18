import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ItemComponent } from '../../core/components/item/item.component';
import { SharePaginationModule } from '../../shared/components/share-pagination/share-pagination.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/api/user.service';

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
export class FavoritePostComponent implements OnInit {
  total: number = 100;
  pageIndex: number = 1;
  pageSize: number = 30;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getFavorite();
  }
  changePage(e: any) {
    this.pageIndex = e;
    this.getFavorite();
  }
  changePageSize(e: any) {
    this.pageSize = e;
    this.getFavorite();
    console.log(e);
  }

  getFavorite() {
    this.userService
      .getFavoriteByID(this.pageIndex, this.pageSize)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
