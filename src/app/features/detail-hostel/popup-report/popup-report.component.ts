import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';
@Component({
  selector: 'app-popup-report',
  standalone: true,
  imports: [
    NzModalModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    MatInputModule,
    FormsModule,
    NzRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './popup-report.component.html',
  styleUrl: './popup-report.component.scss',
})
export class PopupReportComponent {
  isConfirmLoading = false;
  radioValue: string = 'A';
  @Input() isVisiblePopUpReport: boolean = false;
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();

  reportSuccess: string;
  selectResionReport: string;
  route: ActivatedRoute = inject(ActivatedRoute);
  Id = this.route.snapshot.params['id'];

  public rpForm: FormGroup = this.fb.group({
    rpOther: [null, Validators.required],
  });
  constructor(
    private translate: TranslateService,
    private snackBar: SnackbarService,
    private fb: FormBuilder,
  ) {
    this.translate
      .get('Toast.reportSuccess')
      .subscribe((value) => (this.reportSuccess = value));
    this.translate
      .get('Toast.pleaseSelectResionReport')
      .subscribe((value) => (this.selectResionReport = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.reportSuccess')
        .subscribe((value) => (this.reportSuccess = value));
      this.translate
        .get('Toast.pleaseSelectResionReport')
        .subscribe((value) => (this.selectResionReport = value));
    });
  }

  handleCancel(): void {
    this.isVisiblePopUpOpen.emit(false);
  }
  handelReport() {
    this.isConfirmLoading = true;
    if (!this.radioValue) {
      this.snackBar.error(this.selectResionReport);
      this.isConfirmLoading = false;
      return;
    }

    if (this.radioValue === 'M') {
      if (this.rpForm.invalid) {
        this.rpForm.markAllAsTouched();
        this.isConfirmLoading = false;
        return;
      }
      console.log(this.rpForm.get('rpOther')?.value);
      this.isVisiblePopUpOpen.emit(false);
      this.isConfirmLoading = false;
      this.snackBar.success(this.reportSuccess);
    } else {
      console.log(this.radioValue);
      this.isConfirmLoading = false;
      this.isVisiblePopUpOpen.emit(false);
      this.snackBar.success(this.reportSuccess);
    }
  }
}
