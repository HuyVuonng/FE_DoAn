import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {}
