import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { PopupDeleteComponent } from './popup-delete.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PopupDeleteComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    // ant design
    NzButtonModule,

    NzModalModule,
    NzPopconfirmModule,

    NzSpinModule,
    NzIconModule,
    // material
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
  exports: [PopupDeleteComponent],
})
export class PopUpDeleteModule {}
