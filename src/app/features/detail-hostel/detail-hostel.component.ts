import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Router, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { CommentComponent } from './comment/comment.component';
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
  ],
  templateUrl: './detail-hostel.component.html',
  styleUrl: './detail-hostel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailHostelComponent implements OnInit {
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  isManager: boolean = false;
  ngOnInit(): void {
    if (this.router.url.includes('detail/manager')) {
      this.isManager = true;
    }
    window.scrollTo(0, 0);
  }
  telZalo: string = 'https://zalo.me/0903985085';
  tel: string = 'tel:0903985085';
  evaluation: string;
  sourceMap = `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q='96 định công khoa công nghệ thông tin';t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`;

  handelSendEvaluation() {
    console.log(this.evaluation);
  }
  confirm() {}

  handleDeletePost() {}
}
