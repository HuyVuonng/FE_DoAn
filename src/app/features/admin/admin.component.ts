import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzI18nService, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MainComponent } from '../../layouts/main/main.component';
import { AuthService } from '../../core/api/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,

    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  isCollapsed: boolean = false;
  language: string = 'vi';
  isReverseArrow = false;
  showCollapsedIcon: boolean = false;
  width = 220;
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private i18n: NzI18nService,
    private auth: AuthService,
  ) {
    if (
      MainComponent.getDeviceType() === 'mobile' ||
      MainComponent.getDeviceType() === 'tablet'
    ) {
      this.showCollapsedIcon = true;
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
    const dfMessenger = document.getElementById('dfMessenger') as HTMLElement;
    if (dfMessenger) {
      dfMessenger.style.display = 'none';
    }
    if (navigator.language.includes('vi')) {
      this.i18n.setLocale(vi_VN);
      console.log('vi');

      this.translate.use('vi');
      this.language = 'vi';
    } else if (navigator.language.includes('en')) {
      this.i18n.setLocale(en_US);

      this.translate.use('en');
      this.language = 'en';
    }
  }
  handleLogout() {
    this.auth.logout();
  }
  changeLanguage(e: any) {
    this.language = e;
    this.translate.use(this.language);
    if (e === 'en') {
      this.i18n.setLocale(en_US);
    } else {
      this.i18n.setLocale(vi_VN);
    }
    this.cdr.detectChanges();
  }
}
