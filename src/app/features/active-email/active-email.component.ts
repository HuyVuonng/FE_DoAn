import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-email',
  standalone: true,
  imports: [TranslateModule, NzSpinModule, NzAlertModule],
  templateUrl: './active-email.component.html',
  styleUrl: './active-email.component.scss',
})
export class ActiveEmailComponent implements OnInit {
  message: string;
  activing: string;
  actived: string;
  type: any = 'infor';
  isSpinning: boolean = true;
  constructor(
    private translate: TranslateService,
    private router: Router,
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
    setTimeout(() => {
      this.type = 'success';
      this.message = this.actived;
      this.isSpinning = false;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, 3000);
  }
}
