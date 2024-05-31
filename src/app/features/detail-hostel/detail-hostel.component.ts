import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SwiperOptions } from 'swiper/types';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Router, RouterModule } from '@angular/router';
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
  }
  telZalo: string = 'https://zalo.me/0903985085';
  tel: string = 'tel:0903985085';
  evaluation: string;
  sourceMap = `<div style="width: 100%"><iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q='96 định công';t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>`;

  handelSendEvaluation() {
    console.log(this.evaluation);
  }
  confirm() {}

  handleDeletePost() {}
}
