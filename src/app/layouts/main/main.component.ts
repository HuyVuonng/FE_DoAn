import {
  ChangeDetectorRef,
  Component,
  OnInit,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
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
import {
  arrowsDownIcon,
  arrowsUpIcon,
  ascSortIcon,
  circle,
  descSortIcon,
  detailTaskIcon,
  ghostIcon,
  groupUser,
  logoutIcon,
  resizeColIcon,
  schoolDocumentIcon,
  tabTaskIcon,
  taskIcon,
} from '../../shared/components/iconAntd/iconAddOnAntd.component';
import { AuthService } from '../../core/api/auth.service';
import { AddressService } from '../../core/services/address.service';

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
    ReactiveFormsModule,
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
  _store = inject(Store);

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
    this.cdr.detectChanges();
  }
  tabActive: number = 0;
  lengthTab: number = 5;
  deviceType: string;

  public form: FormGroup = this.fb.group({
    city: [null],
    district: [null],
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private iconService: NzIconService,
    private authService: AuthService,
    private addressService: AddressService,
    private fb: FormBuilder,
  ) {
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
  }
  count: number;
  ngOnInit(): void {
    if (this.getDeviceType() === 'mobile') {
      this.isCollapsed = true;
      this.cdr.detectChanges();
    }
    this._store.select('renderDataMenu').subscribe((data) => {
      this.cdr.detectChanges();
    });
    this.userName = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.name;

    this.getListProvince();
    MainComponent.getData();
  }

  listCity: any;
  listDistrict: any;
  getListProvince() {
    this.addressService.getCities().subscribe((data) => {
      this.listCity = data;
    });
    const provinceControl = this.form.get('city') as FormControl;
    provinceControl.valueChanges.subscribe((value) => {
      this.addressService.getDistricts(value).subscribe((data) => {
        this.listDistrict = data;
      });
      this.form.get('district')?.reset();
      this.form.get('district')?.setValue(null);
    });
  }
  changeTab(index: number) {
    this.tabActive = index;
    this.cdr.detectChanges();
  }
  getDeviceType = () => {
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
  public static data: any = [];
  public static getData: any = () => {
    // console.log('á');
    MainComponent.data.push('a');
  };
  get staticData() {
    return MainComponent.data;
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
}
