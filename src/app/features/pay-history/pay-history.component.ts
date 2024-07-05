import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ShareTableModule } from '../../shared/components/share-table/share-table.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

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
export class PayHistoryComponent {
  isSpinning: boolean = false;
  public isLoading: boolean = false;
  public totalCount: number = 90;
  createPostTitle: string;
  editPostTitle: string;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
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
  public form: FormGroup = this.fb.group({
    title: [null],
    type: [null],
  });
  searchByEnter(e: any) {
    if (e.keyCode === 13) {
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

  changePage($event: number) {}
  changePageSize($event: number) {}
  resetSearch() {
    this.form.reset();
  }
  handelSearch() {}
}
