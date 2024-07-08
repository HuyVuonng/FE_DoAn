import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NotiService } from '../../../core/services/noti.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss'],
})
export class PopupDeleteComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() isVisible: boolean;
  @Input() id: string = '';
  @Input() param: any;
  @Output() changeVisible = new EventEmitter<any>();
  @Input() funnctionCall: (data: any) => Observable<any>;
  loading: boolean = false;
  updateSuccess: string;

  constructor(
    private notiService: NotiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
    });
  }

  ngOnInit(): void {}

  handleOk(): void {
    if (this.funnctionCall) {
      this.loading = true;
      this.funnctionCall(this.param).subscribe(
        (data: any) => {
          this.loading = false;
          this.notiService.success(this.updateSuccess);
          this.changeVisible.emit({ isVisible: false, isDelete: true });
        },
        (error: any) => {
          this.loading = false;
          this.notiService.error();
          this.changeVisible.emit({ isVisible: false, isDelete: false });
        },
      );
    }
  }

  handleCancel(): void {
    const body = {
      isVisible: false,
      isDelete: false,
    };
    this.changeVisible.emit(body);
  }
}
