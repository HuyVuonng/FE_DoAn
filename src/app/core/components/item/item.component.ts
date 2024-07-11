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
      'https://img.thuephongtro.com/images/thumb/2020/10/08/20201008070713-mavi4.jpg';
    e.onerror = null;
  }
}
