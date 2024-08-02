import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DiscountService } from '../../../core/api/discount.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatLabel,
    CurrencyMaskModule,
    NzSpinModule,
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  post: string;
  updateSuccessMessage: string;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private snackbar: SnackbarService,
    private discountService: DiscountService,
  ) {
    this.translate
      .get('AdminPage.configPage.post')
      .subscribe((value) => (this.post = value));
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccessMessage = value));
    this.configNumberOfPost.suffix = ` ${this.post}`;
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('AdminPage.configPage.post')
        .subscribe((value) => (this.post = value));
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccessMessage = value));
      this.configNumberOfPost.suffix = ` ${this.post}`;
    });

    this.getDiscountConfig();
  }
  public form: FormGroup = this.fb.group({
    percentSale: [5, Validators.required],
    countPostToSale: [10, Validators.required],
    updatedPrice: [25000, Validators.required],
    createdPrice: [50000, Validators.required],
  });
  config: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: '',
    suffix: ' VND',
    thousands: '.',
  };
  configPercent: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: '',
    suffix: ' %',
    thousands: '.',
  };
  configNumberOfPost: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: '',
    suffix: '',
    thousands: '.',
  };
  dataDefault: any;
  resetData() {
    console.log(this.dataDefault);

    this.form.patchValue(this.dataDefault);
  }
  handelApply() {
    this.isLoading = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    this.discountService
      .setConfigDiscount(this.form.getRawValue())
      .subscribe((data) => {
        this.snackbar.success(this.updateSuccessMessage);
        this.isLoading = false;
        this.dataDefault = data;
      });
  }
  getDiscountConfig() {
    this.discountService.getDiscountConfig().subscribe((data) => {
      this.form.patchValue(data);
      this.dataDefault = data;
    });
  }
}
