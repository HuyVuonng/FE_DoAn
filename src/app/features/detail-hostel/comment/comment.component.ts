import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements AfterViewInit {
  @ViewChild('comment') comment: ElementRef;
  @Input() content: string;
  more: string;
  hide: string;
  constructor(private translate: TranslateService) {
    this.translate.get('Button.more').subscribe((value) => (this.more = value));
    this.translate.get('Button.hide').subscribe((value) => (this.hide = value));
    this.titleShowMore = this.more;
    this.translate.onLangChange.subscribe((e) => {
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
  titleShowMore: string;
  isOpen: boolean = false;
  showBtnShowMore: boolean = false;
  ngAfterViewInit(): void {
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
}
