import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ItemComponent } from '../../../core/components/item/item.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PostService } from '../../../core/api/post.service';
import { postSearchModel } from '../../../core/models/post';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [ItemComponent, NzDropDownModule, NzPaginationModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss',
})
export class HomeSearchComponent implements OnInit {
  type: Observable<string | null>;
  district: Observable<string | null>;
  ward: Observable<string | null>;
  acreage: Observable<string | null>;
  priceRange: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}
  ngOnInit(): void {
    this.type = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('type')),
    );
    this.district = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('district')),
    );

    this.ward = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('ward')),
    );

    this.acreage = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('acreage')),
    );

    this.priceRange = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('priceRange')),
    );

    this.type.subscribe((param) => {
      this.body.hostelTypeId = Number(param);
    });
    this.district.subscribe((param) => {
      this.body.district = param;
    });
    this.ward.subscribe((param) => {
      this.body.ward = param;
    });
    this.acreage.subscribe((param) => {
      this.body.acreage = Number(param);
    });
    this.priceRange.subscribe((param) => {
      this.body.price = Number(param);
      this.handelSearchPost();
    });
  }
  handelSort(sort: number) {
    let body: any;
    switch (sort) {
      case 1:
        body = {
          type: 'price',
          sort: 'ASC ',
        };
        break;
      case 2:
        body = {
          type: 'price',
          sort: 'DESC ',
        };
        break;
      case 3:
        body = {
          type: 'acreage',
          sort: 'ASC ',
        };
        break;
      case 4:
        body = {
          type: 'acreage',
          sort: 'DESC ',
        };
        break;
    }
    console.log(body);
  }
  body: postSearchModel = {
    hostelTypeId: null,
    district: null,
    ward: null,
    acreage: null,
    priceRange: null,
  };
  handelSearchPost() {
    Object.keys(this.body).forEach((key) => {
      if (
        this.body[key] === null ||
        this.body[key] === '' ||
        this.body[key] === 0
      ) {
        delete this.body[key];
      }
    });
    this.postService.searchPost(this.body).subscribe((data) => {
      console.log(data);
    });
  }
}
