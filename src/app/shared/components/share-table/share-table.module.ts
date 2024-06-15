import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareTableComponent } from './share-table.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharePaginationModule } from '../share-pagination/share-pagination.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ShareTableComponent],
  imports: [
    CommonModule,
    SharePaginationModule,
    NzSpinModule,
    NzIconModule,
    TranslateModule,
  ],
  exports: [ShareTableComponent],
})
export class ShareTableModule {}
