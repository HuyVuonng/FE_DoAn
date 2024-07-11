import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() data: any;
  onerror(e: any) {
    e.target.src =
      'https://img.thuephongtro.com/images/thumb/2021/11/06/20211106101731-oro4r.jpg';
    e.onerror = null;
  }
}
