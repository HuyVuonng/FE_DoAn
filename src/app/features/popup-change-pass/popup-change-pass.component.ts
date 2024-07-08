import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { rePassValidator } from '../../shared/validate/check-repass.directive';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../core/services/snackbar.service';
import { passWordValidator } from '../../shared/validate/check-password.directive';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatInputModule } from '@angular/material/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthService } from '../../core/api/auth.service';
import { changePassModel } from '../../core/models/user';

@Component({
  selector: 'app-popup-change-pass',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    NzButtonModule,
    MatInputModule,
    NzModalModule,
    NzIconModule,
    FormsModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    NzSelectModule,
  ],
  templateUrl: './popup-change-pass.component.html',
  styleUrl: './popup-change-pass.component.scss',
})
export class PopupChangePassComponent implements OnInit {
  isConfirmLoading = false;
  @Input() email: string;
  @Input() isVisiblePopUpChangePass: boolean = false;
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();
  notify: string;
  AlerPhoneNumber: string;
  AlerEmail: string;
  registerSuccess: string;
  updateSuccess: string;
  oldPasswordIncorrect: string;
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisiblePopUpOpen.emit(false);
  }
  handleCancel(): void {
    this.isVisiblePopUpOpen.emit(false);
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private snackBar: SnackbarService,
    private authService: AuthService,
  ) {}

  public form: FormGroup = this.fb.group({
    oldPassword: [null, [Validators.required, passWordValidator()]],
    password: [null, [Validators.required, passWordValidator()]],
    rePass: [null, Validators.required],
  });
  ngOnInit(): void {
    this.translate
      .get('Toast.oldPasswordIncorrect')
      .subscribe((value) => (this.oldPasswordIncorrect = value));
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
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
        .get('Toast.oldPasswordIncorrect')
        .subscribe((value) => (this.oldPasswordIncorrect = value));
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
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
  confirm(): void {
    this.isConfirmLoading = true;
    const body: changePassModel = {
      email: this.email,
      oldPassword: this.form.get('oldPassword')?.value,
      newPassword: this.form.get('password')?.value,
      reNewPassword: this.form.get('rePass')?.value,
    };
    if (this.form.invalid) {
      this.form.get('oldPassword')?.markAsTouched();
      this.form.get('password')?.markAsTouched();
      this.form.get('rePass')?.markAsTouched();
      this.isConfirmLoading = false;
      return;
    }
    this.authService.changePass(body).subscribe(
      (data) => {
        this.isConfirmLoading = false;

        this.snackBar.success(this.updateSuccess);
        this.isVisiblePopUpOpen.emit(false);
      },
      (err) => {
        if (err.status === 400) {
          this.isConfirmLoading = false;
          this.snackBar.error(this.oldPasswordIncorrect);
        } else {
          this.isConfirmLoading = false;
          this.snackBar.error('Error');
        }
      },
    );
  }

  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
  }

  hidePass: boolean = true;
  hideOldPass: boolean = true;
  hideRePass: boolean = true;

  showOldPass(e: any) {
    const inputPass = document.querySelector(
      '#inputOldPassword',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';

      this.hideOldPass = false;
    } else {
      inputPass.type = 'password';
      this.hideOldPass = true;
    }
  }

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
}
