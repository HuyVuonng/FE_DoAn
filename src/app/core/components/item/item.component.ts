import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
