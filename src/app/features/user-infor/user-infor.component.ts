import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { phoneNumberValidator } from '../../shared/validate/check-phone-number.directive';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { PopupChangePassComponent } from '../popup-change-pass/popup-change-pass.component';
import { AuthService } from '../../core/api/auth.service';
import { ActivatedRoute } from '@angular/router';
import { updateUserInforModel } from '../../core/models/user';
import { SnackbarService } from '../../core/services/snackbar.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AccountStatus } from '../../core/enums/acountStatusEnum';
@Component({
  selector: 'app-user-infor',
  standalone: true,
  imports: [
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    MatFormField,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    NzPopconfirmModule,
    PopupChangePassComponent,
    NzButtonModule,
  ],
  templateUrl: './user-infor.component.html',
  styleUrl: './user-infor.component.scss',
})
export class UserInforComponent implements OnInit {
  userInfor: any;
  activeRoute = inject(ActivatedRoute);
  idUser: any = this.activeRoute.snapshot.params['id'];
  statusActive: string;
  statusInactive: string;
  statusList: any;
  updateSuccess: string;
  isEditLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private auth: AuthService,
    private snackbar: SnackbarService,
  ) {}
  isEdit: boolean = false;
  isVisibleChangePass = false;
  handleShowChangePassPopUp(e: boolean) {
    this.isVisibleChangePass = e;
  }
  ngOnInit(): void {
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate
      .get('userInforPage.statusActive')
      .subscribe((value) => (this.statusActive = value));
    this.translate
      .get('userInforPage.statusInActive')
      .subscribe((value) => (this.statusInactive = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
      this.translate
        .get('userInforPage.statusActive')
        .subscribe((value) => (this.statusActive = value));
      this.translate
        .get('userInforPage.statusInActive')
        .subscribe((value) => (this.statusInactive = value));
    });
    this.statusList = [
      {
        label: this.statusActive,
        value: AccountStatus.Active,
      },
      {
        label: this.statusInactive,
        value: AccountStatus.InActive,
      },
    ];
    this.getUserByID();
    this.formAccountInfor.controls['activeDate'].disable();
    this.formAccountInfor.disable();
    this.formUserInfor.disable();
  }

  public formAccountInfor: FormGroup = this.fb.group({
    fullName: [null, Validators.required],
    phoneNumber: [null, [phoneNumberValidator(), Validators.required]],

    email: [null, [Validators.email, Validators.required]],
    statusAccount: [1, Validators.required],
    activeDate: [moment(), Validators.required],
  });
  public formUserInfor: FormGroup = this.fb.group({
    fullName: [null, Validators.required],
    phoneNumber: [null, [phoneNumberValidator(), Validators.required]],
    dateOfBirth: [null, Validators.required],
    email: [null, [Validators.email, Validators.required]],
    address: [null, Validators.required],
  });
  handelEditInfor() {
    this.isEdit = true;
    this.formAccountInfor.enable();
    this.formUserInfor.enable();
    this.formAccountInfor.controls['activeDate'].disable();
    this.formAccountInfor.controls['email'].disable();
  }
  handelCanEdit() {
    this.isEdit = false;
    this.formAccountInfor.disable();
    this.formUserInfor.disable();
  }
  handelOpenPopUpChangePass() {
    this.isVisibleChangePass = true;
  }
  cancel() {}
  confirm() {}
  handelUpdateUserInfor() {
    this.isEditLoading = true;
    const body: updateUserInforModel = {
      ...this.userInfor,
      fullName: this.formAccountInfor.get('fullName')?.value,
      phoneNumber: this.formAccountInfor.get('phoneNumber')?.value,
      id: this.idUser,
      statusAccount: this.formAccountInfor.get('statusAccount')?.value,
    };
    this.auth.updateUser(body).subscribe((data) => {
      this.snackbar.success(this.updateSuccess);
      this.getUserByID();
      this.formAccountInfor.disable();
      this.isEdit = false;
      this.isEditLoading = false;
    });
  }

  getUserByID() {
    this.auth.getAccountInforByID(this.idUser).subscribe((data) => {
      this.userInfor = data;
      this.formAccountInfor.patchValue({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        statusAccount: data.statusAccount,
        activeDate: moment(data.createDate),
      });
    });
  }
}
