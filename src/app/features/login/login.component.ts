import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { SnackbarService } from '../../core/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/api/auth.service';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { RegisterComponent } from '../register/register.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ForgotPassWordComponent } from '../forgot-pass-word/forgot-pass-word.component';
import { PopUpInsertOTPComponent } from '../forgot-pass-word/pop-up-insert-otp/pop-up-insert-otp.component';
import { PopUpChangePassComponent } from '../forgot-pass-word/pop-up-change-pass/pop-up-change-pass.component';
import { HttpHeaders } from '@angular/common/http';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { logInModel } from '../../core/models/user';
import { error } from 'console';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    NzCheckboxModule,
    FormsModule,
    RegisterComponent,
    TranslateModule,
    ForgotPassWordComponent,
    PopUpInsertOTPComponent,
    PopUpChangePassComponent,
    NzButtonModule,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required],
  });
  remember: boolean = false;
  emailOrPasswordIsIncorrect: string;
  isLoginLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _snackBar: SnackbarService,
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService,
  ) {
    if (navigator.language.includes('vi')) {
      this.translate.use('vi');
      this.language = 'vi';
    } else if (navigator.language.includes('en')) {
      this.translate.use('en');
      this.language = 'en';
    }
    window.addEventListener('storage', (event) => {
      // The `key` is `null` if the event was caused by `.clear()`
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      console.warn(
        'Noticed changes to access_token (most likely from another tab), updating isAuthenticated',
      );
    });

    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
    }
    this.translate
      .get('Toast.emailOrPasswordIsIncorrect')
      .subscribe((value) => (this.emailOrPasswordIsIncorrect = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.emailOrPasswordIsIncorrect')
        .subscribe((value) => (this.emailOrPasswordIsIncorrect = value));
    });
  }
  idIntervalLoginTrueAccount: any;
  ngOnInit(): void {}

  language: string = 'vi';
  login() {
    this.isLoginLoading = true;
    const body: logInModel = {
      email: this.formLogin.get('userName')?.value,
      password: this.formLogin.get('password')?.value,
      isKeepLogin: true,
    };
    if (this.formLogin.invalid) {
      this.formLogin.get('userName')?.markAsTouched();
      this.formLogin.get('password')?.markAsTouched();
      this.isLoginLoading = false;
      return;
    }
    this.auth.login(body).subscribe(
      (data) => {
        this.isLoginLoading = false;
        localStorage.setItem('access_token', '123');
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 200) {
          this.isLoginLoading = false;
          localStorage.setItem('access_token', '123');
          this.router.navigate(['/']);
        } else {
          this._snackBar.error(this.emailOrPasswordIsIncorrect);
          this.isLoginLoading = false;
        }
      },
    );
  }

  hide: boolean = true;
  showPass(e: any) {
    const inputPass = document.querySelector('#inputPass') as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';

      this.hide = false;
    } else {
      inputPass.type = 'password';
      this.hide = true;
    }
  }
  forgotPassword() {}
  isVisibleRegister = false;
  handleShowRegisterPopUp(e: boolean) {
    this.isVisibleRegister = e;
  }
  handleOpenPopUpRegister() {
    this.isVisibleRegister = true;
  }

  isVisibleForgotPassWord = false;
  handleShowForgotPassWordPopUp(e: any) {
    this.isVisibleForgotPassWord = e.thisPopUp;
    this.isVisibleInsertOTP = e.nextPopUp;
    this.cdr.detectChanges();
  }
  handleOpenPopUpForgotPassWord() {
    this.isVisibleForgotPassWord = true;
  }

  isVisibleInsertOTP = false;
  handleShowInsertOTPPopUp(e: any) {
    this.isVisibleInsertOTP = e.thisPopUp;
    this.isVisibleChangePass = e.nextPopUp;
    this.cdr.detectChanges();
  }

  isVisibleChangePass = false;
  handleShowChangePassPopUp(e: boolean) {
    this.isVisibleChangePass = e;
  }

  changeLanguage(e: any) {
    this.language = e;
    this.translate.use(this.language);
    this.cdr.detectChanges();
  }
  handelLoginByEnter(e: any) {
    if (e.keyCode === 13) {
      this.login();
    }
  }
}
