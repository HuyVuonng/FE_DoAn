import { Component, OnInit } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ShareTableModule } from '../../../../shared/components/share-table/share-table.module';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

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
  ],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss',
})
export class ReportListComponent implements OnInit {
  isSpinning: boolean = false;
  listStatus: any[] = [];
  public form: FormGroup = this.fb.group({
    title: [null],
    status: [null],
  });
  noProcessTitle: string;
  processedTitle: string;
  acceptReportTitle: string;
  denyReportTitle: string;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
  ) {
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
    this.translate.onLangChange.subscribe((e) => {
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
          label: this.processedTitle,
          value: 1,
        },
        {
          label: this.noProcessTitle,
          value: 0,
        },
      ];
    });
  }
  ngOnInit(): void {
    this.listStatus = [
      {
        label: this.processedTitle,
        value: 1,
      },
      {
        label: this.noProcessTitle,
        value: 0,
      },
    ];
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

  changePage($event: number) {}
  changePageSize($event: number) {}
  resetSearch() {
    this.form.reset();
  }
  handelSearch() {
    const searchValue = { ...this.form.getRawValue() };

    Object.keys(searchValue).forEach((key) => {
      if (
        searchValue[key] === null ||
        searchValue[key] === '' ||
        searchValue[key] === 0
      ) {
        delete searchValue[key];
      }
    });
  }
  searchByEnter(e: any) {
    console.log('a');

    if (e.keyCode === 13) {
      console.log('an');

      this.handelSearch();
    }
  }
  handelViewPostReport(id: string) {
    window.open(`detail/${id}`, '_blank');
  }
}
