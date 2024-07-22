import { Component, OnInit } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ShareTableModule } from '../../shared/components/share-table/share-table.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../core/api/user.service';

@Component({
  selector: 'app-pay-history',
  standalone: true,
  imports: [
    NzSpinModule,
    ShareTableModule,
    TranslateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    DatePipe,
  ],
  templateUrl: './pay-history.component.html',
  styleUrl: './pay-history.component.scss',
})
export class PayHistoryComponent implements OnInit {
  isSpinning: boolean = false;
  public isLoading: boolean = false;
  public totalCount: number = 90;
  createPostTitle: string;
  editPostTitle: string;
  pageIndex: number = 1;
  pageSize: number = 30;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private userService: UserService,
  ) {
    this.translate
      .get('payHistoryPage.createNewPost')
      .subscribe((value) => (this.createPostTitle = value));
    this.translate
      .get('payHistoryPage.editPost')
      .subscribe((value) => (this.editPostTitle = value));
    this.payTypeList = [
      {
        label: this.createPostTitle,
        value: 0,
      },
      {
        label: this.editPostTitle,
        value: 1,
      },
    ];
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('payHistoryPage.createNewPost')
        .subscribe((value) => (this.createPostTitle = value));
      this.translate
        .get('payHistoryPage.editPost')
        .subscribe((value) => (this.editPostTitle = value));
      this.payTypeList = [
        {
          label: this.createPostTitle,
          value: 0,
        },
        {
          label: this.editPostTitle,
          value: 1,
        },
      ];
    });
  }
  ngOnInit(): void {
    this.getPayHistory();
  }
  public form: FormGroup = this.fb.group({
    title: [null],
    type: [null],
  });
  searchByEnter(e: any) {
    if (e.keyCode === 13) {
      this.handelSearch();
    }
  }
  payTypeList: any;

  data: any = [
    {
      title:
        'nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo',
      paydate: new Date(),
      payType: 1,
      cost: 25000,
    },
    {
      title:
        'nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo',
      paydate: new Date(),
      payType: 0,
      cost: 50000,
    },
  ];
  formatNumberWithDot(value: any): string {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return '';
  }
  body: any = {
    pageNumber: this.pageIndex,
    pageSize: this.pageSize,
  };
  changePage($event: number) {
    this.pageIndex = $event;
    this.body.pageNumber = this.pageIndex;
    this.getPayHistory();
  }
  changePageSize($event: number) {
    this.pageSize = $event;
    this.body.pageSize = this.pageSize;
    this.getPayHistory();
  }
  resetSearch() {
    this.form.reset();
    this.pageIndex = 1;
    this.pageSize = 30;

    this.body = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.getPayHistory();
  }
  handelSearch() {
    if (
      this.form.get('type')?.value === 0 ||
      this.form.get('type')?.value === 1
    ) {
      this.body.type = this.form.get('type')?.value;
    }
    if (this.form.get('title')?.value) {
      this.body.title = this.form.get('title')?.value;
    }
    this.body.pageNumber = this.pageIndex;
    this.body.pageSize = this.pageSize;
    this.getPayHistory();
  }

  getPayHistory() {
    this.userService.getPayHistory2(this.body).subscribe((data) => {
      console.log(data);
      this.data = data.data;
      this.pageIndex = data.pageNumber;
      this.pageSize = data.pageSize;
      this.totalCount = data.totalItem;
    });
  }
}
