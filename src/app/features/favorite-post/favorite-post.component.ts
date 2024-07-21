import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ItemComponent } from '../../core/components/item/item.component';
import { SharePaginationModule } from '../../shared/components/share-pagination/share-pagination.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/api/user.service';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/api/post.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-favorite-post',
  standalone: true,
  imports: [
    TranslateModule,
    ItemComponent,
    SharePaginationModule,
    CommonModule,
    FormsModule,
    NzSpinModule,
  ],
  templateUrl: './favorite-post.component.html',
  styleUrl: './favorite-post.component.scss',
})
export class FavoritePostComponent implements OnInit {
  total: number = 100;
  pageIndex: number = 1;
  pageSize: number = 30;
  isSpinning: boolean = false;
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}
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
  data: any = [];
  async getFavorite() {
    this.isSpinning = true;
    this.data = [];
    this.userService
      .getFavoriteByID(this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.pageIndex = data.pageNumber;
        this.pageSize = data.pageSize;
        this.total = data.totalItem;
        if (data?.data) {
          data.data.forEach((item: any) => {
            this.data.push(item.post);
          });
        }

        this.isSpinning = false;
      });
  }
}
