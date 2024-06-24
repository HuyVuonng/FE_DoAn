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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { phoneNumberValidator } from '../../shared/validate/check-phone-number.directive';
import { rePassValidator } from '../../shared/validate/check-repass.directive';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { PayAndSendMailService } from '../../core/api/PayAndSendMailServices';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-forgot-pass-word',
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
    NzRadioModule,
  ],
  templateUrl: './forgot-pass-word.component.html',
  styleUrl: './forgot-pass-word.component.scss',
})
export class ForgotPassWordComponent {
  isConfirmLoading = false;
  @Input() isVisiblePopUpForgotPassWord: boolean = false;
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();

  handleOk(): void {
    console.log('Button ok clicked!');
    if (this.form.invalid) {
      this.form.get('email')?.markAsTouched();
      return;
    }
    this.isVisiblePopUpOpen.emit({
      thisPopUp: false,
      nextPopUp: false,
    });
    this.handelSendMailForgotPass();
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    this.isVisiblePopUpOpen.emit({
      thisPopUp: false,
      nextPopUp: false,
    });
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private PayAndSendMailService: PayAndSendMailService,
    private snackBar: SnackbarService,
    private translate: TranslateService,
  ) {
    this.translate
      .get('PopUpForgotPassword.forgotPassSendmail')
      .subscribe((value) => (this.mess = value));

    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('PopUpForgotPassword.forgotPassSendmail')
        .subscribe((value) => (this.mess = value));
    });
  }

  public form: FormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
  });
  mess: string;
  handelSendMailForgotPass() {
    const nameCustomer = this.form.get('fullName')?.value;
    const body = {
      email: this.form.get('email')?.value,
      activeLink: `${window.location.protocol}//${window.location.host}/forgotPass/1`,
    };
    this.PayAndSendMailService.sendMailForgotPass(body).subscribe(
      () => {
        this.snackBar.success(this.mess);
      },
      (err) => {
        if (err.status === 200) {
          this.snackBar.success(this.mess);
        }
      },
    );
  }
}
