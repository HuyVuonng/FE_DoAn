import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/api/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-active-email',
  standalone: true,
  imports: [TranslateModule, NzSpinModule, NzAlertModule],
  templateUrl: './active-email.component.html',
  styleUrl: './active-email.component.scss',
})
export class ActiveEmailComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  message: string;
  activing: string;
  actived: string;
  type: any = 'infor';
  isSpinning: boolean = true;
  email: string = this.activeRoute.snapshot.params['id'];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private auth: AuthService,
    private snackbar: SnackbarService,
  ) {
    this.translate
      .get('Login.activingAccount')
      .subscribe((value) => (this.activing = value));
    this.translate
      .get('Login.accountActivated')
      .subscribe((value) => (this.actived = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Login.activingAccount')
        .subscribe((value) => (this.activing = value));
      this.translate
        .get('Login.accountActivated')
        .subscribe((value) => (this.actived = value));
    });
  }
  ngOnInit(): void {
    this.message = this.activing;
    this.handelActiveAccount();
  }
  handelActiveAccount() {
    const body = {
      email: this.email,
    };
    this.auth.activeAccount(body).subscribe(
      (data) => {
        this.type = 'success';
        this.message = this.actived;
        this.isSpinning = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (err) => {
        if (err.status === 200) {
          this.type = 'success';
          this.message = this.actived;
          this.isSpinning = false;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.isSpinning = false;
          this.snackbar.error(err.error);
        }
      },
    );
  }
}
