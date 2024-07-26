import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { PostService } from '../../../core/api/post.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    NzDropDownModule,
    TranslateModule,
    NzPopconfirmModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements AfterViewInit {
  @ViewChild('comment') comment: ElementRef;
  @Input() content: any;
  more: string;
  hide: string;
  deleteSuccess: string;
  constructor(
    private translate: TranslateService,
    private postService: PostService,
    private snackBar: SnackbarService,
  ) {
    this.translate.get('Button.more').subscribe((value) => (this.more = value));
    this.translate.get('Button.hide').subscribe((value) => (this.hide = value));
    this.translate
      .get('Toast.deleteSuccess')
      .subscribe((value) => (this.deleteSuccess = value));
    this.titleShowMore = this.more;
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.deleteSuccess')
        .subscribe((value) => (this.deleteSuccess = value));

      this.translate
        .get('Button.more')
        .subscribe((value) => (this.more = value));
      this.translate
        .get('Button.hide')
        .subscribe((value) => (this.hide = value));

      if (this.isOpen) {
        this.titleShowMore = this.hide;
      } else {
        this.titleShowMore = this.more;
      }
    });
  }
  userId: number = JSON.parse(localStorage.getItem('user_infor') || '{}')?.id;
  titleShowMore: string;
  isOpen: boolean = false;
  showBtnShowMore: boolean = false;
  showOption: boolean = false;
  ngAfterViewInit(): void {
    if (Number(this.userId) === Number(this.content.accountId)) {
      this.showOption = true;
    }
    if (this.comment.nativeElement.clientHeight > 63) {
      this.showBtnShowMore = true;
      this.comment.nativeElement.classList.add('line-clamp-3');
    }
  }
  commentDate = new Date();
  handelShowMore() {
    this.comment.nativeElement.classList.toggle('line-clamp-3');
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.titleShowMore = this.hide;
    } else {
      this.titleShowMore = this.more;
    }
  }
  handleDeleteComment(id: any) {
    console.log(id);
    this.postService.deleteComment(id).subscribe(
      (data) => {
        this.snackBar.success(this.deleteSuccess);
      },
      (err) => {
        this.snackBar.error(err.error);
      },
    );
  }
}
