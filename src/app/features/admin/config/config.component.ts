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
  }
  public form: FormGroup = this.fb.group({
    percentageDiscount: [5, Validators.required],
    quantityPostedForDiscount: [10, Validators.required],
    updatePostFee: [25000, Validators.required],
    newPostFee: [50000, Validators.required],
  });
  config: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: '',
    suffix: ' VND',
    thousands: '.',
  };
  configPercent: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: '',
    suffix: ' %',
    thousands: '.',
  };
  configNumberOfPost: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    decimal: ',',
    precision: 0,
    prefix: '',
    suffix: '',
    thousands: '.',
  };
  resetData() {}
  handelApply() {
    this.isLoading = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.isLoading = false;
      return;
    }
  }
}
