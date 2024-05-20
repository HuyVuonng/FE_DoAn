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
  public form: FormGroup = this.fb.group({
    owner: [null, Validators.required],
    phoneNumber: [null, [Validators.required, phoneNumberValidator()]],
    zalo: [null, [phoneNumberValidator()]],
    city: [null, Validators.required],
    district: [null, Validators.required],
    ward: [null, Validators.required],
    acreage: [null, Validators.required],
    price: [null, Validators.required],
    addressDetail: [null, Validators.required],
    title: [null, Validators.required],
    description: [null],
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
  ) {
    this.translatelabelSelectInput();
  }
  ngOnInit(): void {
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
    });

    const provinceControl = this.form.get('city') as FormControl;
    provinceControl.valueChanges.subscribe((value) => {
      this.addressService.getDistricts(value).subscribe((data) => {
        this.listDistrict = data;
      });
      this.form.get('district')?.reset();
      this.form.get('district')?.setValue(null);
    });
    const districtControl = this.form.get('district') as FormControl;
    districtControl.valueChanges.subscribe((value) => {
      this.addressService.getWards(value).subscribe((data) => {
        this.listWard = data;
      });
      this.form.get('ward')?.reset();
      this.form.get('ward')?.setValue(null);
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
  }

  ChangeImage(e: any) {}
  onSelectIMG = (e: any) => {
    this.isSpinning = true;
    const file = e.target.files[0];
    const imgRef = ref(this.storage, `images/${new Date().getTime()}`);
    uploadBytes(imgRef, file).then((res) => {
      getDownloadURL(res.ref).then((url) => {
        this.urlIMGArray.push(url);
        this.isSpinning = false;
      });
    });
  };

  deleteIMG = (file: any) => {
    this.urlIMGArray = this.urlIMGArray.filter((f: any) => f !== file);
  };
  changeAddress = (e: any) => {
    this.sourceMap = `<div style="width: 100%"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q='${e.target.value}';t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>`;
    this.cdr.detectChanges();
  };
}
