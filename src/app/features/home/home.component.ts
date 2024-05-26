import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AddressService } from '../../core/services/address.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../layouts/main/main.component';

import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    city: [0],
    district: [0],
    ward: [0],
    acreage: [0],
    priceRange: [0],
  });
  city: Observable<string | null>;
  district: Observable<string | null>;
  ward: Observable<string | null>;
  acreage: Observable<string | null>;
  priceRange: Observable<string | null>;

  isShowSearch: boolean = true;
  labelAll: string;
  labelBelow1Milion: string;
  label1MilionsTo2Milions: string;
  label2MilionsTo4Milions: string;
  label4MilionsTo6Milions: string;
  label6MilionsTo8Milions: string;
  label8MilionsTo10Milions: string;
  labelOver10Milions: string;
  labelDeal: string;
  labelBelow20M2: string;
  labelOver100M2: string;
  href: string;
  constructor(
    private addressService: AddressService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.translatelabelSelectInput();
  }

  device: string;
  ngOnInit(): void {
    this.device = MainComponent.getDeviceType();
    if (
      MainComponent.getDeviceType() === 'mobile' ||
      MainComponent.getDeviceType() === 'tablet'
    ) {
      this.isShowSearch = false;
    }

    this.city = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('city')),
    );
    this.district = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('district')),
    );

    this.ward = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('ward')),
    );

    this.acreage = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('acreage')),
    );

    this.priceRange = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('priceRange')),
    );

    this.getListValue();
  }

  translatelabelSelectInput() {
    this.translate
      .get('labelInput.all')
      .subscribe((value) => (this.labelAll = value));
    this.translate
      .get('labelInput.below1Milions')
      .subscribe((value) => (this.labelBelow1Milion = value));
    this.translate
      .get('labelInput.1MilionsTo2Milions')
      .subscribe((value) => (this.label1MilionsTo2Milions = value));
    this.translate
      .get('labelInput.2MilionsTo4Milions')
      .subscribe((value) => (this.label2MilionsTo4Milions = value));
    this.translate
      .get('labelInput.4MilionsTo6Milions')
      .subscribe((value) => (this.label4MilionsTo6Milions = value));
    this.translate
      .get('labelInput.6MilionsTo8Milions')
      .subscribe((value) => (this.label6MilionsTo8Milions = value));
    this.translate
      .get('labelInput.8MilionsTo10Milions')
      .subscribe((value) => (this.label8MilionsTo10Milions = value));

    this.translate
      .get('labelInput.over10Milions')
      .subscribe((value) => (this.labelOver10Milions = value));

    this.translate
      .get('labelInput.deal')
      .subscribe((value) => (this.labelDeal = value));
    this.translate
      .get('labelInput.below20M2')
      .subscribe((value) => (this.labelBelow20M2 = value));
    this.translate
      .get('labelInput.over100M2')
      .subscribe((value) => (this.labelOver100M2 = value));

    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('labelInput.all')
        .subscribe((value) => (this.labelAll = value));
      this.translate
        .get('labelInput.below1Milions')
        .subscribe((value) => (this.labelBelow1Milion = value));
      this.translate
        .get('labelInput.1MilionsTo2Milions')
        .subscribe((value) => (this.label1MilionsTo2Milions = value));
      this.translate
        .get('labelInput.2MilionsTo4Milions')
        .subscribe((value) => (this.label2MilionsTo4Milions = value));
      this.translate
        .get('labelInput.4MilionsTo6Milions')
        .subscribe((value) => (this.label4MilionsTo6Milions = value));
      this.translate
        .get('labelInput.6MilionsTo8Milions')
        .subscribe((value) => (this.label6MilionsTo8Milions = value));
      this.translate
        .get('labelInput.8MilionsTo10Milions')
        .subscribe((value) => (this.label8MilionsTo10Milions = value));

      this.translate
        .get('labelInput.over10Milions')
        .subscribe((value) => (this.labelOver10Milions = value));

      this.translate
        .get('labelInput.deal')
        .subscribe((value) => (this.labelDeal = value));
      this.translate
        .get('labelInput.below20M2')
        .subscribe((value) => (this.labelBelow20M2 = value));
      this.translate
        .get('labelInput.over100M2')
        .subscribe((value) => (this.labelOver100M2 = value));
      this.getListValue();
    });
  }
  listCity: any = [];
  listDistrict: any = [];
  listWard: any = [];
  listPriceRange: any = [];
  listAcreage: any = [];
  getListValue() {
    this.addressService.getCities().subscribe((data) => {
      this.listCity = data;
      this.listCity.unshift({ label: this.labelAll, value: 0 });
      this.listDistrict = [];
      this.listDistrict.push({ label: this.labelAll, value: 0 });
      this.listWard = [];
      this.listWard.push({ label: this.labelAll, value: 0 });
      this.city?.subscribe((param) => {
        if (param) {
          this.form.patchValue({ city: param });
        }
      });
    });
    this.addressService
      .getDistricts(this.form.get('city')?.value)
      .subscribe((data) => {
        this.listDistrict = data;
        this.listDistrict.unshift({ label: this.labelAll, value: 0 });
        this.form.patchValue({ district: 0 });
        this.district?.subscribe((param) => {
          if (param) {
            this.form.patchValue({ district: param });
          }
        });
      });
    const provinceControl = this.form.get('city') as FormControl;
    provinceControl.valueChanges.subscribe((value) => {
      this.addressService.getDistricts(value).subscribe((data) => {
        this.listDistrict = data;
        this.listDistrict.unshift({ label: this.labelAll, value: 0 });
        this.form.patchValue({ district: 0 });
        this.district?.subscribe((param) => {
          if (param) {
            this.form.patchValue({ district: param });
          }
        });
      });
      // this.form.get('district')?.reset();
      this.form.get('district')?.setValue(0);
    });
    const districtControl = this.form.get('district') as FormControl;
    districtControl.valueChanges.subscribe((value) => {
      this.addressService.getWards(value).subscribe((data) => {
        this.listWard = data;
        this.listWard.unshift({ label: this.labelAll, value: 0 });
        this.form.patchValue({ ward: 0 });
        this.ward?.subscribe((param) => {
          if (param) {
            this.form.patchValue({ ward: param });
          }
        });
      });
      // this.form.get('ward')?.reset();
      this.form.get('ward')?.setValue(0);
    });

    this.listPriceRange = [
      {
        label: this.labelAll,
        value: 0,
      },
      {
        label: this.labelBelow1Milion,
        value: 1,
      },
      {
        label: this.label1MilionsTo2Milions,
        value: 2,
      },
      {
        label: this.label2MilionsTo4Milions,
        value: 3,
      },
      {
        label: this.label4MilionsTo6Milions,
        value: 4,
      },
      {
        label: this.label6MilionsTo8Milions,
        value: 5,
      },
      {
        label: this.label8MilionsTo10Milions,
        value: 6,
      },
      {
        label: this.labelOver10Milions,
        value: 7,
      },
      {
        label: this.labelDeal,
        value: 8,
      },
    ];

    this.listAcreage = [
      {
        label: this.labelAll,
        value: 0,
      },
      {
        label: this.labelBelow20M2,
        value: 1,
      },
      {
        label: '20-30 M2',
        value: 2,
      },
      {
        label: '30-40 M2',
        value: 3,
      },
      {
        label: '40-60 M2',
        value: 4,
      },
      {
        label: '60-80 M2',
        value: 5,
      },
      {
        label: '80-100 M2',
        value: 6,
      },
      {
        label: this.labelOver100M2,
        value: 7,
      },
    ];

    this.acreage?.subscribe((param) => {
      if (param) {
        this.form.patchValue({ acreage: 2 });
      }
    });
    this.priceRange?.subscribe((param) => {
      if (param) {
        this.form.patchValue({ priceRange: 2 });
      }
    });
  }
  resetSearch() {
    this.form.patchValue({
      city: 0,
      district: 0,
      ward: 0,
      acreage: 0,
      priceRange: 0,
    });
    this.href = this.router.url;
    if (this.href.includes('search')) {
      this.router.navigate(['/search']);
    }
  }
  handelSearch() {
    const searchValue = { ...this.form.getRawValue() };

    Object.keys(searchValue).forEach((key) => {
      if (
        searchValue[key] === null ||
        searchValue[key] === '' ||
        searchValue[key] === 0
      ) {
        delete searchValue[key];
      }
    });

    if (
      searchValue.city ||
      searchValue.district ||
      searchValue.ward ||
      searchValue.acreage ||
      searchValue.priceRange
    ) {
      this.router.navigate(['/search'], {
        queryParams: searchValue,
      });
    }
  }
}
