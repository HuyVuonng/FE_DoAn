import { CommonModule, DatePipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { CommentComponent } from './comment/comment.component';
import { PopupReportComponent } from './popup-report/popup-report.component';
import { PostService } from '../../core/api/post.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Location } from '@angular/common';
import { commentModel } from '../../core/models/post';
import moment from 'moment';
import { UserService } from '../../core/api/user.service';
@Component({
  selector: 'app-detail-hostel',
  standalone: true,
  imports: [
    NzIconModule,
    TranslateModule,
    NzButtonModule,
    CommonModule,
    FormsModule,
    NzPopconfirmModule,
    RouterModule,
    MapComponent,
    CommentComponent,
    PopupReportComponent,
    DatePipe,
  ],
  templateUrl: './detail-hostel.component.html',
  styleUrl: './detail-hostel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailHostelComponent implements OnInit {
  commentSuccess: string;
  commentFalse: string;
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private PostService: PostService,
    private cdr: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private translate: TranslateService,
    private _location: Location,
    private userService: UserService,
  ) {
    this.translate
      .get('Toast.deleteSuccess')
      .subscribe((value) => (this.deleteSuccess = value));
    this.translate
      .get('Toast.commentSucceeded')
      .subscribe((value) => (this.commentSuccess = value));
    this.translate
      .get('Toast.commentFalse')
      .subscribe((value) => (this.commentFalse = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.deleteSuccess')
        .subscribe((value) => (this.deleteSuccess = value));
      this.translate
        .get('Toast.commentSucceeded')
        .subscribe((value) => (this.commentSuccess = value));
      this.translate
        .get('Toast.commentFalse')
        .subscribe((value) => (this.commentFalse = value));
    });
  }
  roleAccount = JSON.parse(localStorage.getItem('user_infor') || '{}')?.roleId;
  idAccount = JSON.parse(localStorage.getItem('user_infor') || '{}')?.id;
  isManager: boolean = false;
  activeRoute = inject(ActivatedRoute);
  idPost: any = this.activeRoute.snapshot.params['id'];
  deleteSuccess: string;
  ngOnInit(): void {
    if (this.router.url.includes('detail/manager')) {
      this.isManager = true;
    }
    window.scrollTo(0, 0);
    this.getDetailPost();
  }
  isLoaddingSendComment: boolean = false;
  telZalo: string = 'https://zalo.me/0903985085';
  tel: string = 'tel:0903985085';
  evaluation: string;
  sourceMap = `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q='96 định công khoa công nghệ thông tin';t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`;

  handelSendEvaluation() {
    this.isLoaddingSendComment = true;
    const bodyComment: commentModel = {
      accountId: this.idAccount,
      content: this.evaluation,
      createDate: moment().toISOString(),
      postId: this.idPost,
    };
    this.PostService.createComment(bodyComment).subscribe(
      (data) => {
        this.snackbar.success(this.commentSuccess);
        this.isLoaddingSendComment = false;
      },
      (err) => {
        this.isLoaddingSendComment = false;
        this.snackbar.error(this.commentFalse);
      },
    );
  }
  confirm() {}

  handleDeletePost() {
    this.deletePost();
  }

  // report
  isVisiblePopUpReport: boolean = false;
  handleShowReportPopUp(e: any) {
    this.isVisiblePopUpReport = e;
  }
  handleOpenReportPopUp() {
    this.isVisiblePopUpReport = true;
  }
  data: any;
  getDetailPost() {
    this.PostService.searchByID(this.idPost).subscribe((data) => {
      this.data = data;
      this.telZalo = `https://zalo.me/${data.zalo}`;
      this.tel = `tel:${data.phoneNumber}`;
      this.sourceMap = `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${data.street}, ${data.ward}, ${data.district}, thành phố Hà Nội;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`;

      this.cdr.detectChanges();
      if (this.roleAccount !== 1 && this.idAccount !== data.accountId) {
        this.router.navigate(['/detail', data.id]);
      }
      this.getComment();
    });
  }
  onerror(e: any) {
    e.target.src =
      'https://img.thuephongtro.com/images/thumb/2021/11/06/20211106101731-oro4r.jpg';
    e.onerror = null;
  }

  deletePost() {
    this.PostService.deletePost(this.idPost).subscribe((data) => {
      this.snackbar.success(this.deleteSuccess);
      this._location.back();
    });
  }
  dataComment: any;
  getComment() {
    this.PostService.getComment(this.idPost).subscribe((data) => {
      this.dataComment = data.data;
      this.getFavoriteByIDPost();
    });
  }
  favorited: boolean = false;
  handleFavorite() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.addFavorite(Number(this.idPost)).subscribe((data) => {
      this.favorited = !this.favorited;
      this.cdr.detectChanges();
    });
  }
  getFavoriteByIDPost() {
    this.userService
      .getFavoriteByIDPostAndUserID(this.idPost)
      .subscribe((data) => {
        if (data.data.length) {
          this.favorited = true;
        }
      });
  }
}
