import {
  ChangeDetectorRef,
  Component,
  OnInit,
  importProvidersFrom,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import {
  HttpClient,
  HttpClientJsonpModule,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/api/auth.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NzI18nService, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { TranslateService } from '@ngx-translate/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import {
  arrowsIcon,
  filterIcon,
  groupUser,
  keySquareIcon,
  sortIcon,
  arrowsDownIcon,
  arrowsUpIcon,
  ascSortIcon,
  circle,
  descSortIcon,
  detailTaskIcon,
  ghostIcon,
  iconZalo,
  logoutIcon,
  resizeColIcon,
  schoolDocumentIcon,
  tabTaskIcon,
  taskIcon,
} from './shared/components/iconAntd/iconAddOnAntd.component';
import { Meta } from '@angular/platform-browser';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzMessageModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NzDropDownModule,
    NzToolTipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class AppComponent implements OnInit {
  title = 'Ngân Hàng Nhà Trọ';
  language: string = 'vi';
  constructor(
    private auth: AuthService,
    private i18n: NzI18nService,
    private translate: TranslateService,
    private iconService: NzIconService,
    private cdr: ChangeDetectorRef,
    private meta: Meta,
  ) {
    this.translate.setDefaultLang('vi');
    this.translate.use(localStorage.getItem('lang') || 'vi');
    this.iconService.addIconLiteral('filterIcon:antd', filterIcon);
    this.iconService.addIconLiteral('sortIcon:antd', sortIcon);
    this.iconService.addIconLiteral('keySquareIcon:antd', keySquareIcon);
    this.iconService.addIconLiteral('arrowsIcon:antd', arrowsIcon);

    if (navigator.language.includes('vi')) {
      this.i18n.setLocale(vi_VN);
      this.translate.use('vi');
      this.language = 'vi';
    } else if (navigator.language.includes('en')) {
      this.i18n.setLocale(en_US);
      this.translate.use('en');
      this.language = 'en';
    }
    this.meta.addTags([
      { name: 'Ngân hàng nhà trọ', content: 'Ngân hàng nhà trọ' },
    ]);
  }
  ngOnInit(): void {
    // this.i18n.setLocale(vi_VN);
    this.iconService.addIconLiteral('groupUserIcon:antd', groupUser);
    this.iconService.addIconLiteral('ghostIcon:antd', ghostIcon);
    this.iconService.addIconLiteral('taskIcon:antd', taskIcon);
    this.iconService.addIconLiteral('circleIcon:antd', circle);
    this.iconService.addIconLiteral('tabTaskIcon:antd', tabTaskIcon);
    this.iconService.addIconLiteral('resizeColIcon:antd', resizeColIcon);
    this.iconService.addIconLiteral('ascSortIcon:antd', ascSortIcon);
    this.iconService.addIconLiteral('descSortIcon:antd', descSortIcon);
    this.iconService.addIconLiteral('detailTaskIcon:antd', detailTaskIcon);
    this.iconService.addIconLiteral(
      'schoolDocumentIcon:antd',
      schoolDocumentIcon,
    );
    this.iconService.addIconLiteral('arrowsUpIcon:antd', arrowsUpIcon);
    this.iconService.addIconLiteral('arrowsDownIcon:antd', arrowsDownIcon);
    this.iconService.addIconLiteral('logoutIcon:antd', logoutIcon);
    this.iconService.addIconLiteral('zaloIcon:antd', iconZalo);
  }
}
