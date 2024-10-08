import {
  ChangeDetectorRef,
  Component,
  OnInit,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TabComponent } from '../../shared/components/tab/tab.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import 'zone.js';
import { Store } from '@ngrx/store';

import { AuthService } from '../../core/api/auth.service';
import { AddressService } from '../../core/services/address.service';
import { NzI18nService, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzSkeletonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    TabComponent,
    TranslateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  isReverseArrow = false;
  width = 280;
  language: string = 'vi';
  userName: string;
  userInfor: any;
  _store = inject(Store);
  isLogin: boolean = localStorage.getItem('access_token') ? true : false;
  languageList = [
    {
      label: 'Tiếng Việt',
      value: 'vi',
    },
    {
      label: 'Tiếng anh',
      value: 'en',
    },
  ];

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
  tabActive: number = 0;
  lengthTab: number = 5;
  deviceType: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private iconService: NzIconService,
    private authService: AuthService,
    private i18n: NzI18nService,
    private route: Router,
    private jwt: JwtHelperService,
  ) {
    console.log(this.jwt.isTokenExpired(localStorage.getItem('access_token')));
    if (
      localStorage.getItem('access_token') &&
      this.jwt.isTokenExpired(localStorage.getItem('access_token'))
    ) {
      localStorage.clear();
      window.location.reload();
    }
    if (navigator.language.includes('vi')) {
      this.translate.use('vi');
      this.language = 'vi';
    } else if (navigator.language.includes('en')) {
      this.translate.use('en');
      this.language = 'en';
    }
    let keysPressed: any = {};

    document.addEventListener('keydown', (event: any) => {
      keysPressed[event.keyCode] = true;
      if (keysPressed[16] && keysPressed[90]) {
        this.handleOpenAddTask();
      }
    });

    document.addEventListener('keyup', (event: any) => {
      delete keysPressed[event.keyCode];
    });
  }
  count: number;
  ngOnInit(): void {
    const dfMessenger = document.getElementById('dfMessenger') as HTMLElement;
    if (dfMessenger) {
      dfMessenger.style.display = 'block';
    }
    if (MainComponent.getDeviceType() === 'mobile') {
      this.isCollapsed = true;
      this.cdr.detectChanges();
    }
    this._store.select('renderDataMenu').subscribe((data) => {
      this.cdr.detectChanges();
    });
    this.userName = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.name;
    this.userInfor = JSON.parse(localStorage.getItem('user_infor') || '{}');
  }

  changeTab(index: number) {
    this.tabActive = index;
    this.cdr.detectChanges();
  }
  public static getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile';
    }
    return 'desktop';
  };
  handelAddTask() {
    console.log('add');
  }
  idUnit: string;
  visibleList: boolean = false;
  handleVisibleList(e: boolean) {
    this.visibleList = e;
  }
  handleOpenAddTask() {
    this.visibleList = true;
    this.idUnit = '';
  }

  handleEditUnit(e: any) {
    this.idUnit = e;
    this.visibleList = true;
    this.cdr.detectChanges();
  }

  visibleAddUnit: boolean = false;
  handleVisibleAddUnit(e: boolean) {
    this.visibleAddUnit = e;
  }
  handleOpenAddUnit() {
    this.visibleAddUnit = true;
    this.idUnit = '';
  }

  visiblePopUpChangeGroup: boolean = false;
  handleVisiblePopUpGroup(e: boolean) {
    this.visiblePopUpChangeGroup = e;
  }

  handleLogout() {
    // localStorage.clear();
    // window.location.reload();
    this.authService.logout();
    // this.OauthService.refreshToken();
  }
  handleGoToPost() {
    if (!localStorage.getItem('access_token')) {
      this.route.navigate(['/login']);
    } else {
      this.route.navigate(['/postNews']);
    }
  }
}
