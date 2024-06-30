import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './user-infor.component.html',
  styleUrl: './user-infor.component.scss',
})
export class UserInforComponent implements OnInit {
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  statusActive: string;
  statusBlock: string;
  statusList: any;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}
  isEdit: boolean = false;
  isVisibleChangePass = false;
  handleShowChangePassPopUp(e: boolean) {
    this.isVisibleChangePass = e;
  }
  ngOnInit(): void {
    this.translate
      .get('userInforPage.statusActive')
      .subscribe((value) => (this.statusActive = value));
    this.translate
      .get('userInforPage.statusBlock')
      .subscribe((value) => (this.statusBlock = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('userInforPage.statusActive')
        .subscribe((value) => (this.statusActive = value));
      this.translate
        .get('userInforPage.statusBlock')
        .subscribe((value) => (this.statusBlock = value));
    });
    this.statusList = [
      {
        label: this.statusActive,
        value: 1,
      },
      {
        label: this.statusBlock,
        value: 0,
      },
    ];
    this.formAccountInfor.controls['activeDate'].disable();
    this.formAccountInfor.disable();
    this.formUserInfor.disable();
  }

  public formAccountInfor: FormGroup = this.fb.group({
    username: [null, Validators.required],
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
}
