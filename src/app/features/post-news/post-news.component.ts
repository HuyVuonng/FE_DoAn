import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AddressService } from '../../core/services/address.service';
import { MatSelectModule } from '@angular/material/select';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { phoneNumberValidator } from '../../shared/validate/check-phone-number.directive';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  Storage,
} from '@angular/fire/storage';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DomSanitizer } from '@angular/platform-browser';
import { MapComponent } from '../../core/components/map/map.component';
import { PayAndSendMailService } from '../../core/api/PayAndSendMailServices';
import { CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { SnackbarService } from '../../core/services/snackbar.service';
@Component({
  selector: 'app-post-news',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    TranslateModule,
    MatSelectModule,
    MatInputModule,
    CKEditorModule,
    NzSpinModule,
    MapComponent,
    CurrencyMaskModule,
  ],
  templateUrl: './post-news.component.html',
  styleUrl: './post-news.component.scss',
})
export class PostNewsComponent implements OnInit {
  public Editor = ClassicEditor;
  sourceMap: any;
  urlIMGArray: any = [];
  storage = inject(Storage);
  isSpinning: boolean = false;
  isSpinningPay: boolean = false;
  viewMap: boolean = false;
  snackBar = inject(SnackbarService);
  public form: FormGroup = this.fb.group({
    owner: [null, Validators.required],
    phoneNumber: [null, [Validators.required, phoneNumberValidator()]],
    zalo: [null, [phoneNumberValidator()]],
    type: [null, Validators.required],
    district: [null, Validators.required],
    ward: [null, Validators.required],
    acreage: [null, Validators.required],
    price: [null, Validators.required],
    addressDetail: [null, Validators.required],
    title: [null, Validators.required],
    description: [null, Validators.required],
    linkImg: [null, Validators.required],
  });
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
  constructor(
    private addressService: AddressService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private PayAndSendMailService: PayAndSendMailService,
  ) {
    this.translatelabelSelectInput();
  }
  ngOnInit(): void {
    this.getListValue();
  }
  config: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: 'VND ',
    suffix: '',
    thousands: '.',
  };
  configAcreage: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: ' ',
    suffix: '',
    thousands: '.',
  };
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
  listType: any = [];
  listDistrict: any = [];
  listWard: any = [];
  getListValue() {
    // this.addressService.getCities().subscribe((data) => {
    //   this.listCity = data;
    // });

    this.addressService.getDistricts('Thành phố Hà Nội').subscribe((data) => {
      this.listDistrict = data;
    });

    const districtControl = this.form.get('district') as FormControl;
    districtControl.valueChanges.subscribe((value) => {
      this.addressService.getWards(value).subscribe((data) => {
        this.listWard = data;
      });
      this.form.get('ward')?.reset();
      this.form.get('ward')?.setValue(null);
    });

    this.listType = [
      {
        label: 'Nhà trọ',
        value: 1,
      },
    ];
  }

  ChangeImage(e: any) {}
  onSelectIMG = (e: any) => {
    this.isSpinning = true;
    const file = e.target.files[0];
    const imgRef = ref(this.storage, `images/${new Date().getTime()}`);
    uploadBytes(imgRef, file).then((res) => {
      getDownloadURL(res.ref).then((url) => {
        this.urlIMGArray.push(url);
        this.form.patchValue({
          linkImg: this.urlIMGArray,
        });
        this.isSpinning = false;
      });
    });
  };

  deleteIMG = (file: any) => {
    this.urlIMGArray = this.urlIMGArray.filter((f: any) => f !== file);
  };
  showMap: boolean = false;
  handelShowMap() {
    this.showMap = true;
  }
  changeAddress = (e: any) => {
    this.sourceMap = '';
    this.sourceMap = `<div style="width: 100%"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q='${e.target.value}';t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>`;
    this.cdr.detectChanges();
  };
  idTimeOut: any;
  handleViewMap() {
    clearTimeout(this.idTimeOut);
    this.viewMap = !this.viewMap;
    this.idTimeOut = setTimeout(() => {
      this.viewMap = false;
      clearTimeout(this.idTimeOut);
    }, 60000);
  }
  handelPostAndPay() {
    this.isSpinningPay = true;

    if (this.form.invalid) {
      // this.form.get('username')?.markAsTouched();
      this.form.get('owner')?.markAsTouched();
      this.form.get('phoneNumber')?.markAsTouched();
      this.form.get('type')?.markAsTouched();
      this.form.get('district')?.markAsTouched();
      this.form.get('ward')?.markAsTouched();
      this.form.get('acreage')?.markAsTouched();
      this.form.get('price')?.markAsTouched();
      this.form.get('addressDetail')?.markAsTouched();
      this.form.get('title')?.markAsTouched();
      this.form.get('description')?.markAsTouched();
      this.form.get('linkImg')?.markAsTouched();
      this.isSpinningPay = false;

      return;
    }
    sessionStorage.setItem('dataPost', JSON.stringify(this.form.getRawValue()));
    this.PayAndSendMailService.pay().subscribe(
      (res) => {
        this.isSpinningPay = false;
        window.location.href = res.link;
      },
      () => {
        this.isSpinningPay = false;
        this.snackBar.error('Error');
      },
    );
  }
  countTitle: number = 0;
  handelPressTitle(e: any) {
    this.countTitle = e.target.value.length;
  }
}
