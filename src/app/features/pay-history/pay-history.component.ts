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
import { PayHistoryService } from '../../core/api/payHistory.service';
import FileSaver from 'file-saver';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SnackbarService } from '../../core/services/snackbar.service';

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
    NzButtonModule,
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
  dowloadSuccess: string;
  dowloadFail: string;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private userService: UserService,
    private payHistoryService: PayHistoryService,
    private snackbarService: SnackbarService,
  ) {
    this.translate
      .get('payHistoryPage.createNewPost')
      .subscribe((value) => (this.createPostTitle = value));
    this.translate
      .get('Toast.dowloadFail')
      .subscribe((value) => (this.dowloadFail = value));
    this.translate
      .get('Toast.dowloadSuccess')
      .subscribe((value) => (this.dowloadSuccess = value));
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
        .get('Toast.dowloadFail')
        .subscribe((value) => (this.dowloadFail = value));
      this.translate
        .get('Toast.dowloadSuccess')
        .subscribe((value) => (this.dowloadSuccess = value));
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
    postTitle: [null],
    type: [null],
  });
  searchByEnter(e: any) {
    if (e.keyCode === 13) {
      this.handelSearch();
    }
  }
  payTypeList: any;

  data: any = [];
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
    if (this.form.get('postTitle')?.value) {
      this.body.postTitle = this.form.get('postTitle')?.value.trim();
    }
    this.body.pageNumber = this.pageIndex;
    this.body.pageSize = this.pageSize;
    this.getPayHistory();
  }

  getPayHistory() {
    this.isLoading = true;
    this.userService.getPayHistory2(this.body).subscribe((data) => {
      this.isLoading = false;

      this.data = data.data;
      this.pageIndex = data.pageNumber;
      this.pageSize = data.pageSize;
      this.totalCount = data.totalItem;
    });
  }

  downloadFileExcel = (data: any, name: string) => {
    const uri = window.URL.createObjectURL(data);
    var downloadLink = document.createElement('a');
    downloadLink.href = uri;
    downloadLink.download = `${name}.xlsx`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  exportFile() {
    this.payHistoryService.exportPayHistory().subscribe(
      (data) => {
        FileSaver.saveAs(data, 'Lịch sử thanh toán.xlsx');
        this.snackbarService.success(this.dowloadSuccess);
      },
      (error) => {
        this.snackbarService.success(this.dowloadFail);
      },
    );
  }
}
