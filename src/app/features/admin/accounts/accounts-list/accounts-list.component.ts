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
  selector: 'app-accounts-list',
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
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
})
export class AccountsListComponent implements OnInit {
  isSpinning: boolean = false;
  public data: any = [
    {
      account: 'test',
      fullName: 'test',
      status: 0,
    },
    {
      account: 'test',
      fullName: 'test',
      status: 1,
    },
    {
      account: 'test',
      fullName: 'test',
      status: 2,
    },
  ];
  public dataBackup: any = [];
  public isLoading: boolean = false;
  public totalCount: number = 90;
  listStatus: any[] = [];
  activelable: string;
  deactiveLable: string;
  blockLabel: string;
  changePage($event: number) {}
  changePageSize($event: number) {}
  public form: FormGroup = this.fb.group({
    account: [null],
    fullName: [null],
    status: [null],
  });
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
  ) {
    this.translate
      .get('labelInput.active')
      .subscribe((value) => (this.activelable = value));
    this.translate
      .get('labelInput.deactivate')
      .subscribe((value) => (this.deactiveLable = value));
    this.translate
      .get('AdminPage.accountsPage.block')
      .subscribe((value) => (this.blockLabel = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('labelInput.active')
        .subscribe((value) => (this.activelable = value));
      this.translate
        .get('labelInput.deactivate')
        .subscribe((value) => (this.deactiveLable = value));
      this.translate
        .get('AdminPage.accountsPage.block')
        .subscribe((value) => (this.blockLabel = value));
      this.listStatus = [
        {
          label: this.activelable,
          value: 1,
        },
        {
          label: this.deactiveLable,
          value: 0,
        },
        {
          label: this.blockLabel,
          value: 2,
        },
      ];
    });
  }
  ngOnInit(): void {
    this.listStatus = [
      {
        label: this.activelable,
        value: 1,
      },
      {
        label: this.deactiveLable,
        value: 0,
      },
      {
        label: this.blockLabel,
        value: 2,
      },
    ];
  }
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
    if (e.keyCode === 13) {
      this.handelSearch();
    }
  }
}
