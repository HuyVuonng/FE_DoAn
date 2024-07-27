import { Component, OnInit } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ShareTableModule } from '../../../../shared/components/share-table/share-table.module';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ReportService } from '../../../../core/api/report.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    NzSpinModule,
    ShareTableModule,
    RouterModule,
    TranslateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    NzDropDownModule,
    DatePipe,
  ],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss',
})
export class ReportListComponent implements OnInit {
  isSpinning: boolean = false;
  listStatus: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 30;
  public form: FormGroup = this.fb.group({
    postTitle: [null],
    reportStatus: [null],
  });
  noProcessTitle: string;
  processedTitle: string;
  acceptReportTitle: string;
  denyReportTitle: string;
  updateSuccess: string;
  deleteSuccess: string;
  pending: string;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private reportService: ReportService,
    private snackbar: SnackbarService,
  ) {
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate
      .get('Toast.deleteSuccess')
      .subscribe((value) => (this.deleteSuccess = value));
    this.translate
      .get('AdminPage.reportpage.noProcessor')
      .subscribe((value) => (this.noProcessTitle = value));
    this.translate
      .get('AdminPage.reportpage.pending')
      .subscribe((value) => (this.pending = value));
    this.translate
      .get('AdminPage.reportpage.processed')
      .subscribe((value) => (this.processedTitle = value));
    this.translate
      .get('AdminPage.reportpage.denyReport')
      .subscribe((value) => (this.denyReportTitle = value));
    this.translate
      .get('AdminPage.reportpage.acceptReport')
      .subscribe((value) => (this.acceptReportTitle = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('AdminPage.reportpage.pending')
        .subscribe((value) => (this.pending = value));
      this.translate
        .get('Toast.deleteSuccess')
        .subscribe((value) => (this.deleteSuccess = value));
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
      this.translate
        .get('AdminPage.reportpage.noProcessor')
        .subscribe((value) => (this.noProcessTitle = value));
      this.translate
        .get('AdminPage.reportpage.processed')
        .subscribe((value) => (this.processedTitle = value));
      this.translate
        .get('AdminPage.reportpage.denyReport')
        .subscribe((value) => (this.denyReportTitle = value));
      this.translate
        .get('AdminPage.reportpage.acceptReport')
        .subscribe((value) => (this.acceptReportTitle = value));
      this.listStatus = [
        {
          label: this.pending,
          value: 0,
        },
        {
          label: this.acceptReportTitle,
          value: 1,
        },

        {
          label: this.denyReportTitle,
          value: 2,
        },
      ];
    });
  }
  ngOnInit(): void {
    this.listStatus = [
      {
        label: this.pending,
        value: 0,
      },
      {
        label: this.acceptReportTitle,
        value: 1,
      },

      {
        label: this.denyReportTitle,
        value: 2,
      },
    ];
    this.getReport();
  }

  public data: any = [
    {
      id: 1,
      postReport: 'Cho thuê phòng trọ tôn thất thuyết quận 4',
      annunciator: 'Nguyễn văn A',
      contentReports:
        'nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo',
      status: 2,
    },
    {
      id: 2,
      postReport: 'Cho thuê phòng trọ tôn thất thuyết quận 4',
      annunciator: 'Nguyễn văn A',
      contentReports:
        'nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo',
      status: 1,
    },
    {
      id: 3,
      postReport: 'Cho thuê phòng trọ tôn thất thuyết quận 4',
      annunciator: 'Nguyễn văn A',
      contentReports:
        'nhà sai sự  thật, lừa đảo nhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảonhà sai sự  thật, lừa đảo',
      status: 0,
    },
  ];
  public dataBackup: any = [];
  public isLoading: boolean = false;
  public totalCount: number = 90;

  changePage($event: number) {
    this.pageIndex = $event;
    this.body.pageNumber = this.pageIndex;
    this.getReport();
  }
  changePageSize($event: number) {
    this.pageSize = $event;
    this.body.pageSize = this.pageSize;
    this.getReport();
  }
  resetSearch() {
    this.form.reset();
    this.pageIndex = 1;
    this.pageSize = 30;
    this.body = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.getReport();
  }
  handelSearch() {
    const searchValue = { ...this.form.getRawValue() };
    Object.keys(searchValue).forEach((key) => {
      if (searchValue[key] === null || searchValue[key] === '') {
        delete searchValue[key];
      }
    });
    this.isLoading = true;
    this.body = {
      ...this.body,
      ...searchValue,
      pageNumber: 1,
      pageSize: 30,
    };
    this.getReport();
  }
  searchByEnter(e: any) {
    console.log('a');

    if (e.keyCode === 13) {
      console.log('an');

      this.handelSearch();
    }
  }
  handelViewPostReport(id: string) {
    console.log(id);

    window.open(`detail/${id}`, '_blank');
  }
  body: any = {
    pageNumber: this.pageIndex,
    pageSize: this.pageSize,
  };
  getReport() {
    this.isLoading = true;
    this.reportService.searchReportByPostTitle(this.body).subscribe(
      (data) => {
        this.data = data.data;
        this.pageIndex = data.pageNumber;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalItem;
        this.isLoading = false;
      },
      () => {
        this.snackbar.error('Error');
        this.isLoading = false;
      },
    );
  }
  handleChangeStatus(data: any, status: number) {
    const body = {
      reportStatus: status,
      postId: data.postId,
      accountId: data.accountId,
    };
    this.reportService.updateReport(body).subscribe(
      (data) => {
        this.snackbar.success(this.updateSuccess);
        this.getReport();
      },
      () => {
        this.snackbar.error('Error');
      },
    );
  }
  handleDelete(id: number) {
    this.reportService.deleteReport(id).subscribe(
      (data) => {
        this.snackbar.success(this.deleteSuccess);
        this.getReport();
      },
      () => {
        this.snackbar.error('Error');
      },
    );
  }
}
