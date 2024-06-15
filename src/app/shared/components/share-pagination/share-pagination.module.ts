import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharePaginationComponent } from './share-pagination.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/** config ng-zorro-antd i18n **/
@NgModule({
  declarations: [SharePaginationComponent],
  imports: [
    CommonModule,
    NzPaginationModule,
    NzSelectModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [SharePaginationComponent],
})
export class SharePaginationModule {}
