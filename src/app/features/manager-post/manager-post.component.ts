import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ItemComponent } from './item/item.component';
@Component({
  selector: 'app-manager-post',
  standalone: true,
  imports: [CommonModule, TranslateModule, ItemComponent],
  templateUrl: './manager-post.component.html',
  styleUrl: './manager-post.component.scss',
})
export class ManagerPostComponent {}
