import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SnackbarService } from '../../core/services/snackbar.service';
import { passWordValidator } from '../../shared/validate/check-password.directive';
import { rePassValidator } from '../../shared/validate/check-repass.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    NzButtonModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss',
})
export class ForgotPassComponent {
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private snackBar: SnackbarService,
    private router: Router,
  ) {
    if (navigator.language.includes('vi')) {
      this.translate.use('vi');
      this.language = 'vi';
    } else if (navigator.language.includes('en')) {
      this.translate.use('en');
      this.language = 'en';
    }
  }
  language: string = 'vi';
  mess: string;
  isForgotPassConfirmLoading: boolean = false;
  hidePass: boolean = true;
  hideRePass: boolean = true;
  public form: FormGroup = this.fb.group({
    password: [null, [Validators.required, passWordValidator()]],
    rePass: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
  });
  ngOnInit(): void {
    this.form.get('email')?.disable();
    this.form
      .get('rePass')
      ?.addValidators(rePassValidator(this.form.get('password')?.value));

    this.translate
      .get('Toast.changePasswordSuccess')
      .subscribe((value) => (this.mess = value));

    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.changePasswordSuccess')
        .subscribe((value) => (this.mess = value));
    });
  }
  changeLanguage(e: any) {
    this.language = e;
    this.translate.use(this.language);
    this.cdr.detectChanges();
  }
  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
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
  submit() {
    this.isForgotPassConfirmLoading = true;
    if (this.form.invalid) {
      this.form.get('password')?.markAsTouched();
      this.form.get('rePass')?.markAsTouched();
      this.form.get('email')?.markAsTouched();
      this.isForgotPassConfirmLoading = false;

      return;
    }
    this.isForgotPassConfirmLoading = false;
    this.snackBar.success(this.mess);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
