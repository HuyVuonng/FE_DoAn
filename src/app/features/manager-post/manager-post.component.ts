import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ItemComponent } from './item/item.component';
import { PostService } from '../../core/api/post.service';
import { ActivatedRoute } from '@angular/router';
import { postSearchModel } from '../../core/models/post';
@Component({
  selector: 'app-manager-post',
  standalone: true,
  imports: [CommonModule, TranslateModule, ItemComponent],
  templateUrl: './manager-post.component.html',
  styleUrl: './manager-post.component.scss',
})
export class ManagerPostComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  idUser: any = this.activeRoute.snapshot.params['id'];
  constructor(private PostService: PostService) {}
  ngOnInit(): void {
    this.getPostByUserID();
  }

  data: any;
  getPostByUserID() {
    const body: postSearchModel = {
      accountId: Number(this.idUser),
      pageNumber: 1,
      pageSize: 30,
    };
    this.PostService.searchPostManager(body).subscribe((data) => {
      this.data = data.data;
    });
  }
}
