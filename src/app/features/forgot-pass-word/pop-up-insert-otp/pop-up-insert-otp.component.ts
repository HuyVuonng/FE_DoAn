import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-pop-up-insert-otp',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    MatInputModule,
    NzRadioModule,
  ],
  templateUrl: './pop-up-insert-otp.component.html',
  styleUrl: './pop-up-insert-otp.component.scss',
})
export class PopUpInsertOTPComponent {
  isConfirmLoading = false;
  @Input() isVisiblePopUpInsertOTP: boolean = false;
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();
  txt1: number;
  txt2: number;
  txt3: number;
  txt4: number;
  txt5: number;
  txt6: number;
  handleOk(): void {
    console.log('Button ok clicked!');
    if (
      this.txt1 &&
      this.txt2 &&
      this.txt3 &&
      this.txt4 &&
      this.txt5 &&
      this.txt6
    ) {
      this.isVisiblePopUpOpen.emit({
        thisPopUp: false,
        nextPopUp: true,
      });
    }
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    this.isVisiblePopUpOpen.emit({
      thisPopUp: false,
      nextPopUp: false,
    });
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  move(e: any, p: any, c: any, n: any) {
    const length = c.value.length;
    const maxLength = c.getAttribute('maxLength');
    if (isNaN(c.value)) {
      c.value = '';
      return;
    }
    if (+maxLength == length) {
      if (n !== '') {
        n.focus();
      }
    }
  }
}
