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
import { AdminService } from '../../../../core/api/admin.service';
import { PopUpDeleteModule } from '../../../../shared/components/popup-delete/popup-delete.module';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/api/auth.service';
import { updateUserInforModel } from '../../../../core/models/user';
import { AccountStatus } from '../../../../core/enums/acountStatusEnum';
import { searchUser } from '../../../../core/models/admin';
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
    PopUpDeleteModule,
    DatePipe,
  ],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
})
export class AccountsListComponent implements OnInit {
  isSpinning: boolean = false;
  public data: any = [];
  public dataBackup: any = [];
  public isLoading: boolean = false;
  public totalCount: number = 90;
  listStatus: any[] = [];
  activelable: string;
  deactiveLable: string;
  blockLabel: string;
  notActivatedLabel: string;
  changePage($event: number) {}
  changePageSize($event: number) {}
  public form: FormGroup = this.fb.group({
    email: [null],
    fullName: [null],
    statusAccount: [null],
  });
  titleDelete: string;
  contentDelete: string;
  titleChangeStatus: string;
  contentChangeStatus: string;
  AccountStatusEnum = AccountStatus;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private adminService: AdminService,
    private auth: AuthService,
  ) {
    this.translate
      .get('Toast.confirmDeleteAccount')
      .subscribe((value) => (this.titleDelete = value));
    this.translate
      .get('Toast.areUSureDeleteAccount')
      .subscribe((value) => (this.contentDelete = value));
    this.translate
      .get('Toast.confirmChangeStatus')
      .subscribe((value) => (this.titleChangeStatus = value));
    this.translate
      .get('Toast.areUSureChangeStatusAccount')
      .subscribe((value) => (this.contentChangeStatus = value));

    this.translate
      .get('userInforPage.notActivated')
      .subscribe((value) => (this.notActivatedLabel = value));
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
        .get('Toast.confirmDeleteAccount')
        .subscribe((value) => (this.titleDelete = value));
      this.translate
        .get('Toast.areUSureDeleteAccount')
        .subscribe((value) => (this.contentDelete = value));
      this.translate
        .get('Toast.confirmChangeStatus')
        .subscribe((value) => (this.titleChangeStatus = value));
      this.translate
        .get('Toast.areUSureChangeStatusAccount')
        .subscribe((value) => (this.contentChangeStatus = value));
      this.translate
        .get('userInforPage.notActivated')
        .subscribe((value) => (this.notActivatedLabel = value));
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
          label: this.notActivatedLabel,
          value: AccountStatus.NoActive,
        },
        {
          label: this.activelable,
          value: AccountStatus.Active,
        },
        {
          label: this.deactiveLable,
          value: AccountStatus.InActive,
        },
        {
          label: this.blockLabel,
          value: AccountStatus.Block,
        },
      ];
    });
  }
  ngOnInit(): void {
    this.listStatus = [
      {
        label: this.notActivatedLabel,
        value: AccountStatus.NoActive,
      },
      {
        label: this.activelable,
        value: AccountStatus.Active,
      },
      {
        label: this.deactiveLable,
        value: AccountStatus.InActive,
      },
      {
        label: this.blockLabel,
        value: AccountStatus.Block,
      },
    ];
    this.getListUsers();
  }
  resetSearch() {
    this.form.reset();
    this.handelSearch();
  }
  handelSearch() {
    this.bodySearchUser = { ...this.form.getRawValue() };
    console.log(this.form.getRawValue());

    Object.keys(this.bodySearchUser).forEach((key) => {
      if (
        this.bodySearchUser[key] === null ||
        this.bodySearchUser[key] === ''
      ) {
        delete this.bodySearchUser[key];
      }
    });
    this.getListUsers();
  }
  searchByEnter(e: any) {
    if (e.keyCode === 13) {
      this.handelSearch();
    }
  }
  bodySearchUser: searchUser = {};
  getListUsers() {
    this.isLoading = true;
    this.adminService.searchUser(this.bodySearchUser).subscribe((data) => {
      this.data = data;
      this.isLoading = false;
    });
  }
  handelDeleteAccount(data: any) {
    this.title = this.titleDelete;
    this.content = this.contentDelete + data.email + '?';
    const body: updateUserInforModel = {
      ...data,
      deleteFlag: false,
    };
    this.param = body;

    this.handelOpenPopUpConfirm();
  }
  handelChangeStatusAccount(data: any, status: boolean) {
    this.title = this.titleChangeStatus;
    this.content = this.contentChangeStatus + data.email + '?';
    const body: updateUserInforModel = {
      ...data,
      statusAccount: status ? 3 : 1,
      deleteFlag: status,
    };
    this.param = body;
    this.handelOpenPopUpConfirm();
  }
  title: string;
  content: string;
  param: any;
  visiblePopUp: boolean = false;
  callConfirm(data: any): Observable<any> {
    return this.auth.updateUser(data);
  }
  handelOpenPopUpConfirm() {
    this.visiblePopUp = true;
  }

  changVisiblePopUp(e: any) {
    this.visiblePopUp = e.isVisible;
    if (e.isDelete) {
      this.isLoading = false;
      this.getListUsers();
    }
  }
}
