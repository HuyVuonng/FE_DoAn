import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SwiperOptions } from 'swiper/types';
@Component({
  selector: 'app-detail-hostel',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './detail-hostel.component.html',
  styleUrl: './detail-hostel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailHostelComponent {
  constructor(public sanitizer: DomSanitizer) {}
  telZalo: string = 'https://zalo.me/0903985085';
  tel: string = 'tel:0903985085';
  sourceMap = `<div style="width: 100%"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q='96 định công';t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>`;
}
