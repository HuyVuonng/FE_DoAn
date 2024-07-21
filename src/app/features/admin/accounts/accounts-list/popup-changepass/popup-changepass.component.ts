import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SnackbarService } from '../../../../../core/services/snackbar.service';
import { AuthService } from '../../../../../core/api/auth.service';
import { passWordValidator } from '../../../../../shared/validate/check-password.directive';
import { rePassValidator } from '../../../../../shared/validate/check-repass.directive';
import { forgotPassModel } from '../../../../../core/models/user';

@Component({
  selector: 'app-popup-changepass',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    MatInputModule,
  ],
  templateUrl: './popup-changepass.component.html',
  styleUrl: './popup-changepass.component.scss',
})
export class PopupChangepassComponent implements OnInit {
  isConfirmLoading = false;
  @Input() isVisiblePopUpChangePass: boolean = false;
  @Input() id: any;
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();
  notify: string;
  AlerPhoneNumber: string;
  AlerEmail: string;
  registerSuccess: string;
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisiblePopUpOpen.emit(false);
  }

  handleCancel(): void {
    this.isVisiblePopUpOpen.emit(false);
  }
  updateSuccess: string;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private translate: TranslateService,
    private snackBar: SnackbarService,
    private authService: AuthService,
  ) {
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
    });
  }

  public form: FormGroup = this.fb.group({
    // username: [null, Validators.required],

    password: [null, [Validators.required, passWordValidator()]],
    rePass: [null, Validators.required],
  });
  ngOnInit(): void {
    this.form
      .get('rePass')
      ?.addValidators(rePassValidator(this.form.get('password')?.value));

    this.translate
      .get('Toast.notify')
      .subscribe((value) => (this.notify = value));
    this.translate
      .get('Toast.AlerEmail')
      .subscribe((value) => (this.AlerEmail = value));
    this.translate
      .get('Toast.AlerPhoneNumber')
      .subscribe((value) => (this.AlerPhoneNumber = value));
    this.translate
      .get('PopUpRegister.registerSuccess')
      .subscribe((value) => (this.registerSuccess = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.notify')
        .subscribe((value) => (this.notify = value));
      this.translate
        .get('Toast.AlerEmail')
        .subscribe((value) => (this.AlerEmail = value));
      this.translate
        .get('Toast.AlerPhoneNumber')
        .subscribe((value) => (this.AlerPhoneNumber = value));
      this.translate
        .get('PopUpRegister.registerSuccess')
        .subscribe((value) => (this.registerSuccess = value));
    });
  }

  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
    if (this.form.get('rePass')?.value !== e.target.value) {
      this.form.get('rePass')?.setErrors({ rePassCheck: true });
    } else {
      this.form.get('rePass')?.setErrors(null);
    }
  }
  hidePass: boolean = true;
  hideRePass: boolean = true;
  showPass(e: any) {
    const inputPass = document.querySelector(
      '#inputPassRegister',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';

      this.hidePass = false;
    } else {
      inputPass.type = 'password';
      this.hidePass = true;
    }
  }
  showRePass(e: any) {
    const inputPass = document.querySelector(
      '#inputRePassRegister',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';

      this.hideRePass = false;
    } else {
      inputPass.type = 'password';
      this.hideRePass = true;
    }
  }
  confirmModal?: NzModalRef;
  showAlerPhoneNumber(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Thông báo',
      nzContent:
        'Bạn không thể xác minh tài khoản thông qua số điện thoại nếu bỏ trống',
      nzOnOk: () => {},
    });
  }
  showAlerEmail(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Thông báo',
      nzContent:
        'Bạn không thể xác minh tài khoản thông qua email nếu bỏ trống',
      nzOnOk: () => {},
    });
  }
  handelChangePass() {
    this.isConfirmLoading = true;
    const body: forgotPassModel = {
      id: this.id,
      newPassword: this.form.get('password')?.value,
      reNewPassword: this.form.get('rePass')?.value,
    };
    this.authService.forgotPass(body).subscribe((data) => {
      this.snackBar.success(this.updateSuccess);
      this.isConfirmLoading = false;
      this.isVisiblePopUpOpen.emit(false);
    });
  }
}
