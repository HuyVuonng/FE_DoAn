import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

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
  }
}
